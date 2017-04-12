/**
 * Plugin that replaces a loadChildren string within Angular2 routes with a lazy load fuse-box promise.
 *
 * @export
 * @class Ng2LazyPlugin
 */
export declare class Ng2RouterPluginClass {
    /**
     * List of modules that have been added via this plugin.
     *
     * @static
     * @type {{ [moduleName: string]: LazyModuleInfo }}
     */
    static lazyModules: {
        [moduleName: string]: LazyModuleInfo;
    };
    /**
     * The FuseBox WorkflowContext.
     *
     * @type {WorkflowContext}
     */
    context: any;
    /**
     * Reference to the global list of modules that have been loaded lazily.
     *
     * @readonly
     * @type {{ [moduleName: string]: LazyModuleInfo }}
     */
    readonly lazyModules: {
        [moduleName: string]: LazyModuleInfo;
    };
    /**
     * Gets the regex pattern used to find the loadChildren string.
     *
     * @readonly
     * @type {RegExp}
     */
    readonly loadChildrenPattern: RegExp;
    /**
     * Options for the plugin.
     *
     * @type {Ng2LazyPluginOptions}
     */
    options: Ng2RouterPluginOptions;
    test: RegExp | string;
    /**
     * Creates an instance of Ng2LazyPluginClass.
     * @param {Ng2LazyPluginOptions} [options]
     */
    constructor(options?: Ng2RouterPluginOptions);
    init(context: any): void;
    onTypescriptTransform(file: any): void;
    /**
     * Implements FuseBox Plugin's onTypescriptTransform's method.
     *
     * @param {any} file
     * @returns
     */
    transform(file: any): void;
    /**
     * Parses the loadChildren string for module information.
     *
     * @param {string} loadChildren
     * @returns
     */
    parseLoadChildrenValue(loadChildren: string): LazyModuleInfo;
    /**
     * Transforms the source code by replacing the loadChildren strings with lazy loaded promises.
     *
     * @param {string} source
     * @returns {string}
     */
    transformSource(source: string): string;
    private _insertLazyImport(moduleInfo);
}
/**
 * Creates a new instance of the Ng2RouterPlugin.
 *
 * @export
 * @returns
 */
export declare function Ng2RouterPlugin(options?: Ng2RouterPluginOptions): Ng2RouterPluginClass;
/**
 * Options that can be passed into the Ng2LazyPlugin.
 *
 * @export
 * @interface Ng2LazyPluginOptions
 */
export interface Ng2RouterPluginOptions {
    /**
     * Optional fn, if set the generated bundle name is created from this. Other bundle naming properties (bundlePrefix, bundleSuffix, etc)
     * are ignored.
     */
    bundleName?: ((info: LazyModuleInfo) => string);
    /**
     * Prefix to add to the generated bundle filename.  Defaults to 'bundle-'.
     *
     * @type {string}
     */
    bundlePrefix?: string;
    /**
     * Suffix to add to the generated bundle filename.  Defaults to ''.
     *
     * @type {string}
     */
    bundleSuffix?: string;
    /**
     * The regex pattern used to find the loadChildren string.
     *
     * @type {RegExp}
     */
    loadChildrenPattern?: RegExp;
    /**
     * The public url folder path that the generated bundles should be generated from.
     *
     * @type {string}
     * @example
     * If your FuseBox outputFile is /build/js/outFile.js, then the default generated bundles will be created in
     * /build/js/.  If the url to reach this folder should be /js/bundle-some.module.js, then you'll want
     * to set the public path to '/js'.  This will cause the generated lazy load code to do a http request
     * to '/js/bundoe-some.module.js'.
     */
    publicPath?: string;
    /**
     * The test property for FuseBox plugins. Can be a regular expression or a string for a simplified regexp.
     * Defaults to '*.ts$|*.js$'.
     *
     * @type {(RegExp|string)}
     */
    test?: RegExp | string;
}
/**
 * Information about a module based on its loadChildren string.
 *
 * @export
 * @interface LazyModuleInfo
 */
export interface LazyModuleInfo {
    /**
     * The import path to the module file itself.
     *
     * @type {string}
     */
    importPath: string;
    /**
     * The path to the bundled module file to load when requested lazily.
     *
     * @type {string}
     */
    loadPath?: string;
    /**
     * The name of the module.
     *
     * @type {string}
     */
    moduleName: string;
    /**
     * Any query parameters
     *
     * @type {{ [key: string]: any }}
     */
    query?: {
        [key: string]: any;
    };
}
