"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Plugin that allows the replacement of templateUrl and styleUrls from strings to require statements.
 *
 * @export
 * @class Ng2TemplatePlugin
 */
class Ng2TemplatePluginClass {
    get ignoreStyleUrls() {
        return this.options.ignoreStyleUrls;
    }
    get ignoreTemplateUrl() {
        return this.options.ignoreTemplateUrl;
    }
    get autoRequireScss() {
        return this.options.autoRequireScss;
    }
    get templateUrlPattern() {
        return this.options.templateUrlPattern;
    }
    get styleUrlsPattern() {
        return this.options.styleUrlsPattern;
    }
    get urlStringPattern() {
        return this.options.urlStringPattern;
    }
    constructor(options) {
        this.options = Object.assign({
            templateUrlPattern: /templateUrl\s*:(\s*['"`](.*?)['"`]\s*([,}]))/gm,
            styleUrlsPattern: /styleUrls *:(\s*\[[^\]]*?\])/g,
            urlStringPattern: /(['`"])((?:[^\\]\\\1|.)*?)\1/g
        }, options);
    }
    /**
     * Implements FuseBox Plugin's onTypescriptTransform 's method.
     *
     * @param {any} file
     * @returns
     */
    onTypescriptTransform(file) {
        file.contents = this.transformSource(file.contents);
    }
    /**
     * Converts urls in a given input string to commonjs require expressions.
     *
     * @param {string} input
     * @returns {string}
     */
    replaceUrls(input) {
        return input.replace(this.urlStringPattern, function (match, quote, url) {
            if (url[0] !== '.') {
                url = './' + url;
            }
            return `require('${url}')`;
        });
    }
    /**
     * Transforms the source by searching for template and style urls and converting them to require statements.
     *
     * @param {string} source
     */
    transformSource(source) {
        if (!this.ignoreTemplateUrl) {
            let HTMLurl = '';
            source = source.replace(this.templateUrlPattern, (match, url) => {
                HTMLurl = url;
                return 'template:' + this.replaceUrls(url);
            });
            if (this.autoRequireScss) {
                let SCSSUrl = HTMLurl.replace('.html', '.scss');
                source = source + this.replaceUrls(SCSSUrl);
            }
        }
        if (!this.ignoreStyleUrls) {
            source = source.replace(this.styleUrlsPattern, (match, urls) => {
                return 'styles:' + this.replaceUrls(urls);
            });
        }
        return source;
    }
}
exports.Ng2TemplatePluginClass = Ng2TemplatePluginClass;
/**
 * Returns a new instance of the Ng2TemplatePluginClass.
 *
 * @export
 * @param {Ng2TemplatePluginOptions} [options]
 * @returns
 */
function Ng2TemplatePlugin(options) {
    return new Ng2TemplatePluginClass(options);
}
exports.Ng2TemplatePlugin = Ng2TemplatePlugin;
