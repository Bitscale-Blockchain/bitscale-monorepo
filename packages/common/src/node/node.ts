import { IService } from "../service-objects";
import { ModuleManager } from "./module";

/**
 * Interface representing configuration options for a generic node.
 */
export interface INodeConfig {
    /**
     * The type of the node (e.g., Sequencer, Executor, etc.).
     */
    nodeType: string;

    /**
     * The network address of the node.
     */
    networkAddress: string;

    // Add more configuration options here as needed for specialized nodes.
}

/**
 * Interface representing an event that a node can emit.
 */
export interface IEvent {
    /**
     * The type of the event.
     */
    type: string;

    /**
     * The timestamp of when the event was created.
     */
    timestamp: string;

    /**
     * The unique identifier (node ID) of the sender.
     */
    sender: string;

    /**
     * The unique identifier (node ID) of the recipient.
     */
    recipient: string;

    /**
     * The data associated with the event.
     */
    data: any;
}

/**
 * Interface for managing the state of a node.
 */
export interface IState {
    /**
     * Set the state for a specific key.
     * @param key - The key for which to set the state.
     * @param value - The value to associate with the key in the node's state.
     */
    setState(key: string, value: any): void;

    /**
     * Get the state for a specific key.
     * @param key - The key for which to retrieve the state.
     * @returns The value associated with the specified key in the node's state.
     */
    getState(key: string): any;
}

/**
 * Interface for managing the lifecycle of a node.
 */
export interface ILifecycle {
    /**
     * Initialize the node and perform any necessary setup.
     */
    init(): void;

    /**
     * Start the node and execute its core functionality.
     */
    run(): void;

    /**
     * Shutdown the node and perform cleanup.
     */
    shutdown(): void;
}

/**
 * Interface for emitting and handling events within a node.
 */
export interface IEventEmitter {
    /**
     * Register an event handler for a specific event type.
     * @param event - The event type to handle.
     * @param handler - The event handler implementing the IService interface.
     */
    on(event: string, handler: IService<any, any>): void;

    /**
     * Emit an event with data, triggering all registered event handlers for that event.
     * @param event - The event type to emit.
     * @param data - The data associated with the event.
     */
    emit(event: string, data: any): void;
}

/**
 * Interface representing a generic node with event handling, error reporting,
 * state management, event emission, lifecycle management capabilities, and configuration.
 */
export interface INode extends IEventEmitter, IState, ILifecycle {
    /**
     * Configure the node with specific settings and parameters.
     * @param config - The configuration object.
     * @param additionalConfig - Additional configuration options for specialized nodes.
     */
    configure(config: INodeConfig, additionalConfig?: any): void;

    /**
     * Register a callback for handling errors.
     * @param callback - The callback function to handle errors.
     */
    onError(callback: (error: Error) => void): void;

    /**
     * Report an issue or error.
     * @param issue - The issue or error message to report.
     */
    reportIssue(issue: string): void;
}


/**
 * An implementation of the INode interface, providing basic event handling,
 * error reporting, state management, event emission, lifecycle management, and configuration capabilities.
 */
class NodeBase implements INode {
    private eventHandlers: Record<string, IService<any, any>[]> = {}; // Stores event handlers
    private config: INodeConfig | null = null; // Configuration object
    private moduleManager: ModuleManager; // Instantiate the module manager

    /**
     * Create a new NodeBase instance.
     */
    constructor() {
        this.moduleManager = new ModuleManager(this)
        // Initialize any internal state or configurations here
    }

    /**
     * Initialize the node and perform any necessary setup.
     */
    init() {

        this.moduleManager.initializeModules(this);
        // Implement initialization logic here
    }

    /**
     * Configure the node with specific settings and parameters.
     * @param config - The configuration object.
     * @param additionalConfig - Additional configuration options for specialized nodes.
     */
    configure(config: INodeConfig, additionalConfig?: any) {
        this.config = config;
        // Additional configuration logic can be added here for specialized nodes
    }

    /**
     * Start the node and execute its core functionality.
     */
    run() {
        // Implement core functionality logic here
    }

    /**
     * Shutdown the node and perform cleanup.
     */
    shutdown() {
        // Implement shutdown and cleanup logic here
    }

    /**
     * Register an event handler for a specific event type.
     * @param event - The event type to handle.
     * @param handler - The event handler implementing the IService interface.
     */
    on(event: string, handler: IService<any, any>) {
        // Register event handler logic
        if (!this.eventHandlers[event]) {
            this.eventHandlers[event] = [];
        }
        this.eventHandlers[event].push(handler);
    }

    /**
     * Emit an event with data, triggering all registered event handlers for that event.
     * @param event - The event type to emit.
     * @param data - The data associated with the event.
     */
    emit(event: string, data: any) {
        const handlers = this.eventHandlers[event];
        if (handlers) {
            // Execute all registered event handlers for the specified event
            for (const handler of handlers) {
                handler.execute(data);
            }
        }
    }

    /**
     * Register a callback for handling errors.
     * @param callback - The callback function to handle errors.
     */
    onError(callback: (error: Error) => void) {
        // Implement error handling logic here
        // You can store the error callback for future error reporting
    }

    /**
     * Report an issue, such as an error message.
     * @param issue - The issue or error message to report.
     */
    reportIssue(issue: string) {
        // Implement issue reporting logic here
        // You can use the registered error callback to report issues
    }

    /**
     * Set the state for a specific key.
     * @param key - The key for which to set the state.
     * @param value - The value to associate with the key in the node's state.
     */
    setState(key: string, value: any) {
        // Implement state management logic here
        // You can store key-value pairs to manage the node's state
    }

    /**
     * Get the state for a specific key.
     * @param key - The key for which to retrieve the state.
     * @returns The value associated with the specified key in the node's state.
     */
    getState(key: string): any {
        // Implement state retrieval logic here
        // Retrieve the value associated with the given key
        return null; // Placeholder, replace with actual logic
    }
}