// @flow

import { getJitsiMeetGlobalNS, loadScript } from '../base/util';

/**
 * Returns promise that resolves with the blur effect instance.
 *
 * @returns {Promise<JitsiStreamBlurEffect>} - Resolves with the blur effect instance.
 */
export function getBlurEffect() {
    const ns = getJitsiMeetGlobalNS();

    if (ns.effects && ns.effects.createBlurEffect) {
        return ns.effects.createBlurEffect();
    }

    return loadScript('libs/video-blur-effect.min.js').then(() => ns.effects.createBlurEffect());
};

/**
 * Checks context filter support
 *
 * @returns {boolean} true if the filter is supported and false if the filter is not supported by the browser.
 */
export function checkFilterSupport() {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (ctx.filter === 'undefined') {
        return false
    }
    if (ctx.filter !== 'undefined') {
        return true
    }
    canvas.remove()
}
