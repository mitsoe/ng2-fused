"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ng2_router_plugin_1 = require("./ng2-router-plugin");
describe('Ng2RouterPlugin', () => {
    let plugin;
    describe('#transformSource', () => {
        beforeEach(() => {
            plugin = ng2_router_plugin_1.Ng2RouterPlugin();
            ng2_router_plugin_1.Ng2RouterPluginClass.lazyModules = {};
        });
        it('should transform the loadChildren property from a string to a function returning a Promise', () => {
            expect(plugin.transformSource(`{ path: 'lazy', loadChildren: './+lazy/lazy.module#LazyModule' }`))
                .toContain('loadChildren: () => new Promise(function (resolve, reject) {');
        });
    });
});
