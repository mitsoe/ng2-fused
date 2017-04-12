"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
/**
 * Plugin that replaces a loadChildren string within Angular2 routes with a lazy load fuse-box promise.
 *
 * @export
 * @class Ng2LazyPlugin
 */
class Ng2RouterPluginClass {
    /**
     * Creates an instance of Ng2LazyPluginClass.
     * @param {Ng2LazyPluginOptions} [options]
     */
    constructor(options) {
        this.test = '*.ts$|*.js$';
        this.options = Object.assign({
            bundlePrefix: 'bundle-',
            bundleSuffix: '',
            loadChildrenPattern: /loadChildren[\s]*:[\s]*['|"](.*?)['|"]/gm
        }, options);
        if (options && options.test) {
            this.test = options.test;
        }
    }
    /**
     * Reference to the global list of modules that have been loaded lazily.
     *
     * @readonly
     * @type {{ [moduleName: string]: LazyModuleInfo }}
     */
    get lazyModules() {
        return Ng2RouterPluginClass.lazyModules;
    }
    /**
     * Gets the regex pattern used to find the loadChildren string.
     *
     * @readonly
     * @type {RegExp}
     */
    get loadChildrenPattern() {
        return this.options.loadChildrenPattern;
    }
    init(context) {
        this.context = context;
    }
    onTypescriptTransform(file) {
        file.contents = this.transformSource(file.contents);
    }
    /**
     * Implements FuseBox Plugin's onTypescriptTransform's method.
     *
     * @param {any} file
     * @returns
     */
    transform(file) {
        file.contents = this.transformSource(file.contents);
    }
    /**
     * Parses the loadChildren string for module information.
     *
     * @param {string} loadChildren
     * @returns
     */
    parseLoadChildrenValue(loadChildren) {
        let split = loadChildren.split('#');
        if (split.length < 2) {
            throw new Error(`Unable to parse '${loadChildren}', not a valid loadChildren string.`);
        }
        let moduleSplit = split[1].split('?');
        let importPath = split[0];
        let moduleName = moduleSplit[0];
        let query;
        if (moduleSplit.length > 1) {
            let querySplit = moduleSplit[1].split('&');
            query = {};
            for (let i = 0; i < querySplit.length; i += 2) {
                query[querySplit[i]] = querySplit[i + 1];
            }
        }
        let moduleFileName = path.basename(importPath);
        let outFolder;
        if (this.context && this.context.outFile) {
            if (this.options.publicPath) {
                outFolder = this.options.publicPath;
            }
            else {
                outFolder = path.dirname(this.context.outFile.replace(process.cwd(), ''));
            }
        }
        let moduleInfo = {
            importPath, moduleName, query
        };
        if (this.options.bundleName) {
            if (typeof this.options.bundleName === 'function') {
                moduleInfo.loadPath = outFolder + '/' + this.options.bundleName(moduleInfo);
            }
            else {
                throw new Error(`Ng2RouterPlugin option 'bundleName' expected function but got '${typeof this.options.bundleName}' instead.`);
            }
        }
        else {
            moduleInfo.loadPath = `${outFolder}/${this.options.bundlePrefix}${moduleFileName}${this.options.bundleSuffix}.js`;
        }
        return moduleInfo;
    }
    /**
     * Transforms the source code by replacing the loadChildren strings with lazy loaded promises.
     *
     * @param {string} source
     * @returns {string}
     */
    transformSource(source) {
        source = source.replace(this.loadChildrenPattern, (match, loadChildren) => {
            let moduleInfo = this.parseLoadChildrenValue(loadChildren);
            this.lazyModules[moduleInfo.moduleName] = moduleInfo;
            return this._insertLazyImport(moduleInfo);
        });
        return source;
    }
    _insertLazyImport(moduleInfo) {
        return 'loadChildren: () => new Promise(function (resolve, reject) {' +
            `FuseBox.exists('${moduleInfo.importPath}') ? resolve(require('${moduleInfo.importPath}')['${moduleInfo.moduleName}']) : ` +
            `FuseBox.import('${moduleInfo.loadPath}', (loaded) => loaded ? ` +
            `resolve(require('${moduleInfo.importPath}')['${moduleInfo.moduleName}']) : ` +
            `reject("Unable to load module '${moduleInfo.moduleName}' from '${moduleInfo.loadPath}'.")) })`;
    }
}
/**
 * List of modules that have been added via this plugin.
 *
 * @static
 * @type {{ [moduleName: string]: LazyModuleInfo }}
 */
Ng2RouterPluginClass.lazyModules = {};
exports.Ng2RouterPluginClass = Ng2RouterPluginClass;
/**
 * Creates a new instance of the Ng2RouterPlugin.
 *
 * @export
 * @returns
 */
function Ng2RouterPlugin(options) {
    return new Ng2RouterPluginClass(options);
}
exports.Ng2RouterPlugin = Ng2RouterPlugin;
