// import qs from 'query-string'
import { Utils } from '../utils'

const METHOD_PATTERN_MAPPER = {
    get: { pattern: '^(get|load|query|fetch)\\w+$' },
    delete: { pattern: '^(delete|remove)\\w+$' },
    head: { pattern: '^(head)\\w+$' },
    options: { pattern: '^(options)\\w+$' },
    post: {
        pattern: '^(create|new|post)\\w+$',
        sendData: true
    },
    put: {
        pattern: '^(update|edit|modify|put)\\w+$',
        sendData: true
    },
    patch: {
        pattern: '^(patch)\\w+$',
        sendData: true
    }
}

const bindMethod = (instance, method, shouldSendData) => (url, args, config = {}) => {
    const mergedConfig = {
        ...config,
        url,
        method
    }

    if (args) {
        // eslint-disable-next-line no-unused-expressions
        shouldSendData ? mergedConfig.data = args : mergedConfig.params = args
    }

    return instance.$dataApi.request(mergedConfig)
}

const resolveMethodByName = (instance, name) => {
    let requestMethod = Object.keys(METHOD_PATTERN_MAPPER).filter((key) => {
        let { pattern } = METHOD_PATTERN_MAPPER[key]

        if (!(pattern instanceof RegExp)) {
            pattern = new RegExp(pattern)
        }

        return pattern.test(name)
    })

    if (requestMethod.length !== 1) {
        throw new Error(`Exception when parse ${name} ,got ${requestMethod.length} methods, but required just one.`)
    }

    requestMethod = requestMethod[0];

    return bindMethod(instance, requestMethod, METHOD_PATTERN_MAPPER[requestMethod].sendData)
}

const resolveMethodByRequestMethod = (instance, requestMethod) => {
    if (/^(post|put|patch)$/.test(requestMethod)) {
        return bindMethod(instance, requestMethod, true)
    } else if (/^(delete|get|head|options)$/.test(requestMethod)) {
        return bindMethod(instance, requestMethod)
    }

    throw new Error(`Unknown method: ${requestMethod}`)
}

const mappingUrls = (urls = {}) => (module) => {
    const keys = Object.keys(urls)

    if (!keys.length) {
        return
    }

    const instance = module.prototype || module

    keys.forEach((name) => {
        const urlObject = urls[name]
        let innerUrl = urlObject
        let requestMethod
        let validateFunc

        if (Utils.isObject(urlObject)) {
            requestMethod = urlObject['method']
            validateFunc = urlObject['validate']
            innerUrl = urlObject['url']
        }

        if (!innerUrl) {
            throw new Error(`${name}() is invalid.`)
        }

        let innerFunc

        if (!requestMethod) {
            innerFunc = resolveMethodByName(instance, name)
        } else {
            innerFunc = resolveMethodByRequestMethod(instance, requestMethod)
        }

        Object.defineProperty(instance, name, {
            configurable: true,
            writable: true,
            enumerable: true,
            value: ((url, func, thisInstance) => (...allArgs) => {
                let args = Array.prototype.slice.call(allArgs)
                let finalUrl = url

                if (Utils.isFunc(validateFunc)) {
                    const msg = validateFunc.apply(thisInstance, args)

                    if (msg) {
                        return new Promise((resolve, reject) => {
                            reject(msg)
                        })
                    }
                }

                if (args.length > 0 && url.includes('/:')) {
                    if (Utils.isObject(args[0])) {
                        const params = args[0]

                        args = args.slice(1)
                        finalUrl = url.replace(/:(\w+)/ig, (_, key) => params[key])
                    }
                }

                return func && func.apply(thisInstance, [finalUrl].concat(args))
            })(innerUrl, innerFunc, instance)
        })
    })
}

export { mappingUrls }
