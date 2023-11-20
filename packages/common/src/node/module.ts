import { INode, IEventEmitter } from "./node"; // Import necessary interfaces

/**
 * Interface representing a module that can be added to an INode.
 */
export interface IModule {
    /**
     * Initialize the module with the parent INode.
     * @param node - The parent INode instance.
     */
    initialize(node: INode): void;

    /**
     * Configure the module with specific settings.
     * @param config - The configuration options for the module.
     */
    configure(config: any): void;

    /**
     * Start the module, perform any necessary setup.
     */
    start(): void;

    /**
     * Stop the module, perform cleanup.
     */
    stop(): void;
}

/**
 * Class to manage modules for an INode instance.
 */
export class ModuleManager {
    private node: INode;
    private modules: IModule[] = [];

    /**
     * Create a ModuleManager for the given INode.
     * @param node - The parent INode instance.
     */
    constructor(node: INode) {
        this.node = node;
    }

    /**
     * Add a module to the INode.
     * @param module - The module to add.
     */
    addModule(module: IModule, config: any) {
        module.configure(config);
        this.modules.push(module);
    }
    
    /**
     * Initialize all modules.
     * @param module - The node to add the modules.
     */
    initializeModules(node: INode) {
        this.modules.forEach((module) => {
            module.initialize(node);
        });
    }

    /**
     * Start all loaded modules.
     */
    startModules() {
        this.modules.forEach((module) => {
            module.start();
        });
    }

    /**
     *  Stop and clean up all loaded modules.
     * @param module - The module to add.
     */
    stopModules() {
        this.modules.forEach((module) => {
            module.stop();
        });
    }

    /**
     * Remove a module from the INode.
     * @param module - The module to remove.
     */
    removeModule(module: IModule) {
        // Stop the module.
        module.stop();

        // Remove the module from the list of active modules.
        const index = this.modules.indexOf(module);
        if (index !== -1) {
            this.modules.splice(index, 1);
        }
    }
}

// Usage example:
// You can use the ModuleManager to manage modules for an INode instance as follows:

// 1. Create an INode instance.
// const myNode: INode = new NodeBase();

// 2. Create a ModuleManager for the INode.
// const moduleManager = new ModuleManager(myNode);

// 3. Create and add modules to the INode.
// const myModule1: IModule = new MyModule1();
// const myModule2: IModule = new MyModule2();

// moduleManager.addModule(myModule1);
// moduleManager.addModule(myModule2);

// 4. Remove modules when they are no longer needed.
// moduleManager.removeModule(myModule1);
// moduleManager.removeModule(myModule2);
