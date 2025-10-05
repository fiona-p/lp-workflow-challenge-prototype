import rawModulesData from './data/modules.json';
import ModuleRenderer from './components/ModuleRenderer';
import type { Module } from './types';
import { jsonCast } from './data/jsonCast';
import './App.css';

/*
App.tsx loads all modules from the generated JSON file
and renders them using ModuleRenderer.
Currently, it renders all modules in one view.

TODO / FUTURE:
Introduce a PageRenderer to filter modules by page,
and use routing to render the correct page view.
*/

function App() {
  const typeScriptSafeModules = jsonCast(rawModulesData);
  return (
    <section>
      {typeScriptSafeModules.map((module: Module) => (
        <ModuleRenderer key={`${module.id}-${module.type}`} module={module} />
      ))}
    </section>
  );
}

export default App;
