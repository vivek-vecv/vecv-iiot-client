import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Gauge from '../components/Gauge.jsx';
import { BsFillGearFill } from 'react-icons/bs';
import GitHubStyleAreaChart from '../components/user/GitHubStyleAreaChart.jsx';
import { useTagStore } from '../store/useTagStore.js';
import TagConfigurationModal from '../components/admin/TagConfiguration.jsx';

export default function HDPage() {
  // 1. Read the slug from URL, e.g. "Robotic-Washing-Machine"
  const { machineSlug } = useParams();
  // 2. Convert hyphens back to spaces → "Robotic Washing Machine"
  const displayName = machineSlug?.split('-').join(' ') || '';

  // Pull the store hooks
  const { tags, getTags, isTagsLoading } = useTagStore();

  useEffect(() => {
    // Fetch live data for this machine
    getTags(displayName);
    // And refetch every 60s
    const iv = setInterval(() => {
      getTags(displayName);
    }, 60000);
    return () => clearInterval(iv);
  }, [getTags, displayName]);

  return (
    <div className="grid grid-cols-12 min-h-screen gap-2">
      {/* Sidebar Details */}
      <aside className="col-span-3 m-3 bg-white shadow-lg rounded-lg p-4">
        <h3>
          Details: <strong>{displayName}</strong>
        </h3>
        <h6>
          Monitoring location: <strong>Machine Shop</strong>
        </h6>
        <h6>
          Device Type: <strong>CBM</strong>
        </h6>
        <h6>
          Machine: <strong>1</strong>
        </h6>
        <h6>
          Machine Group: <strong>1</strong>
        </h6>
        <h6>
          Model Name: <strong>N/A</strong>
        </h6>
        <h6>
          Manufacturer: <strong>CES</strong>
        </h6>
        <h6>
          Rated kWh Load: <strong>90KWh</strong>
        </h6>
      </aside>

      {/* Main Content */}
      <main className="col-span-9 flex flex-col gap-6 m-3 bg-white shadow-lg rounded-lg py-4">
        {/* Live Values Header */}
        <div className="flex justify-between items-center px-4">
          <div className="font-bold bg-info text-white px-2 rounded-lg shadow-lg">
            Live Values
          </div>
          <button
            className="btn btn-ghost"
            onClick={() => document.getElementById('tag-config-modal').showModal()}
          >
            <BsFillGearFill />
          </button>
        </div>
        <TagConfigurationModal />

        {/* Gauges */}
        <div className="flex flex-wrap gap-3 justify-center py-4">
          {isTagsLoading
            ? <span>Loading…</span>
            : tags.map((tag) => (
                <div key={tag.tagName} style={{ maxWidth: 170, maxHeight: 170 }}>
                  <Gauge
                    totalTicks={5}
                    heading={tag.tagName}
                    min={Number(tag.guageMin)}
                    max={Number(tag.guageMax)}
                    maxValue={Number(tag.maxValue)}
                    minValue={Number(tag.minValue)}
                    type="radial"
                    value={tag.sensor_value}
                    alertMessage={tag.alertMsg}
                  />
                </div>
              ))}
        </div>

        {/* Historic Data */}
        <div>
          <div className="font-bold bg-info text-white px-2 rounded-lg shadow-lg ms-4 w-fit">
            Historic Data
          </div>
        </div>
        <GitHubStyleAreaChart />
      </main>
    </div>
  );
}
