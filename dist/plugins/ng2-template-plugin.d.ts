/**
 * Plugin that allows the replacement of templateUrl and styleUrls from strings to require statements.
 *
 * @export
 * @class Ng2TemplatePlugin
 */
export declare class Ng2TemplatePluginClass {
    readonly ignoreStyleUrls: boolean;
    readonly ignoreTemplateUrl: boolean;
    readonly autoRequireScss: boolean;
    options: Ng2TemplatePluginOptions;
    readonly templateUrlPattern: RegExp;
    readonly styleUrlsPattern: RegExp;
    readonly urlStringPattern: RegExp;
    constructor(options?: Ng2TemplatePluginOptions);
    /**
     * Implements FuseBox Plugin's onTypescriptTransform 's method.
     *
     * @param {any} file
     * @returns
     */
    onTypescriptTransform(file: any): void;
    /**
     * Converts urls in a given input string to commonjs require expressions.
     *
     * @param {string} input
     * @returns {string}
     */
    replaceUrls(input: string): string;
    /**
     * Transforms the source by searching for template and style urls and converting them to require statements.
     *
     * @param {string} source
     */
    transformSource(source: string): string;
}
/**
 * Returns a new instance of the Ng2TemplatePluginClass.
 *
 * @export
 * @param {Ng2TemplatePluginOptions} [options]
 * @returns
 */
export declare function Ng2TemplatePlugin(options?: Ng2TemplatePluginOptions): Ng2TemplatePluginClass;
/**
 * Options that can be passed to the Ng2TemplatePlugin
 */
export interface Ng2TemplatePluginOptions {
    /**
     * Whether or not to ignore converting styleUrls properties. Defaults to false.
     *
     * @type {boolean}
     * @memberOf Ng2TemplatePluginOptions
     */
    ignoreStyleUrls?: boolean;
    /**
     * Whether or not to ignore converting templateUrl properties. Defaults to false.
     *
     * @type {boolean}
     * @memberOf Ng2TemplatePluginOptions
     */
    ignoreTemplateUrl?: boolean;
    /**
     * The regex pattern to search for the 'templateUrl' property in component metadata.
     *
     * @type {boolean}
     * @memberOf Ng2TemplatePluginOptions
     */
    autoRequireScss?: boolean;
    /**
     * Whether or not to automatically require scss files based on templateUrl name. Defaults to false.
     *
     * @type {boolean}
     * @memberOf Ng2TemplatePluginOptions
     */
    templateUrlPattern?: RegExp;
    /**
     * The regex pattern to search for the 'styleUrls' property in component metadata.
     *
     * @type {RegExp}
     * @memberOf Ng2TemplatePluginOptions
     */
    styleUrlsPattern?: RegExp;
    /**
     * The regex pattern to grab the string url within templateUrl and styleUrls properties.
     *
     * @type {RegExp}
     * @memberOf Ng2TemplatePluginOptions
     */
    urlStringPattern?: RegExp;
}
