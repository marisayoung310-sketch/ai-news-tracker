import type { SourcePlugin } from './types.js';

class PluginRegistry {
  private plugins = new Map<string, SourcePlugin>();

  register(plugin: SourcePlugin): void {
    if (this.plugins.has(plugin.name)) {
      console.warn(`Plugin "${plugin.name}" is already registered, overwriting.`);
    }
    this.plugins.set(plugin.name, plugin);
  }

  get(name: string): SourcePlugin | undefined {
    return this.plugins.get(name);
  }

  getOrThrow(name: string): SourcePlugin {
    const plugin = this.plugins.get(name);
    if (!plugin) {
      const available = this.list().map(p => p.name).join(', ');
      throw new Error(`Plugin "${name}" not found. Available: ${available}`);
    }
    return plugin;
  }

  list(): SourcePlugin[] {
    return Array.from(this.plugins.values());
  }

  has(name: string): boolean {
    return this.plugins.has(name);
  }
}

export const registry = new PluginRegistry();
