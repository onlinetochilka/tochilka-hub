import { useState } from 'react';
import apps from '../../data/apps';
import AppCard from './AppCard';
import AppDetailPanel from './AppDetailPanel';

export default function AppGrid() {
  const [selectedApp, setSelectedApp] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 w-full">
        {apps.map((app, index) => (
          <AppCard
            key={app.id}
            app={app}
            index={index}
            onSelect={setSelectedApp}
          />
        ))}
      </div>

      {selectedApp && (
        <AppDetailPanel
          app={selectedApp}
          onClose={() => setSelectedApp(null)}
        />
      )}
    </>
  );
}
