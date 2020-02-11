import { Env, Browser } from '../env'

import { trimUrlSlash } from './utils'
import { Http } from './http'

export const urlDownload = (url, filename) => {
    if (Env.isBrowser) {
        const newUrl = trimUrlSlash(url);
        const link = document.createElement('a');

        link.setAttribute('href', newUrl);
        link.setAttribute('target', '_blank');

        if (filename) {
            link.setAttribute('download', filename);
        }

        document.body.append(link);

        if (Browser.isSafari) {
            const clickEv = document.createEvent('MouseEvents');

            clickEv.initEvent('click', true, true);
            link.dispatchEvent(clickEv);
        } else {
            link.click();
        }

        setTimeout(() => {
            document.body.removeChild(link);
        }, 0);
    }

    throw new Error('Download can only be used in Browser environment.')
}

export const urlsave = async (url, filepath, filename) => {
    if (Env.isNode) {
        const newUrl = trimUrlSlash(url);
        const fs = require('fs')
        const path = require('path')

        // eslint-disable-next-line no-sync
        if (!fs.existsSync(filepath)) {
            // eslint-disable-next-line no-sync
            fs.mkdirSync(filepath);
        }

        const fullpath = path.resolve(filepath, filename)

        // axios image download with response type "stream"
        const response = await Http.get(newUrl, { responseType: 'stream' })

        // pipe the result stream into a file on disc
        response.data.pipe(fs.createWriteStream(fullpath))

        // return a promise and resolve when download finishes
        return new Promise((resolve, reject) => {
            response.data.on('end', () => {
                resolve()
            })

            response.data.on('error', () => {
                reject()
            })
        })
    }

    return Promise.reject('Save can only be used in Node environment.')
}
