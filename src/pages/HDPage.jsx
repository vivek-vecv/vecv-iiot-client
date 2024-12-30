import { useEffect } from 'react';
import Gauge from '../components/Gauge.jsx';
import GitHubStyleAreaChart from '../components/user/GitHubStyleAreaChart.jsx';
import { useTagStore } from '../store/useTagStore.js';

export default function HDPage() {
  const { tags, getTags, isTagsLoading, updateTag } = useTagStore();
  console.log('------------------tags-------------------\n', tags);
  useEffect(() => {
    // Fetch tags immediately on mount
    getTags();

    // Set up an interval to fetch tags every 1 minute
    const interval = setInterval(() => {
      getTags();
    }, 60000); // 60000ms = 1 minute

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [getTags]);
  return (
    <div className="grid grid-cols-12 min-h-screen gap-2">
      <div className="col-span-3 m-3 bg-white shadow-lg rounded-lg p-4">
        <h3>
          Details: <strong>HD1 Robotic Washing Machine</strong>{' '}
        </h3>
        <h6>
          monitoring location: <strong>ST-65 Vibration</strong>{' '}
        </h6>
        <h6>
          Device Type: <strong>heat sensor</strong>
        </h6>
        <h6>
          Machine:<strong>0</strong>
        </h6>
        <h6>
          Machine Group:<strong>0</strong>
        </h6>
        <h6>
          Model Name:<strong>0</strong>
        </h6>
        <h6>
          Manufacturer:<strong>0</strong>
        </h6>
        <h6>
          Rated kWh Load:<strong>0</strong>
        </h6>
      </div>

      <div className="col-span-9 flex flex-col gap-6 m-3 bg-white shadow-lg rounded-lg py-4">
        <div>
          <div className="ms-4 w-fit font-bold bg-info text-white px-2 rounded-lg shadow-lg">Live values</div>
          <div className="flex flex-wrap gap-3 justify-center py-4">
            {tags &&
              tags.map((tag) => (
                <div key={tag.id} style={{ maxWidth: '170px', maxHeight: '170px' }}>
                  <Gauge
                    totalTicks={7}
                    heading={tag.tagname}
                    min={Number(tag.min_value)}
                    max={Number(tag.max_value)}
                    type={'radial'}
                    value={tag.sensor_value}
                    alertMessage={tag.alertMsg}
                  />
                </div>
              ))}
          </div>
        </div>
        <div>
          <div className="w-fit ms-4 font-bold bg-info text-white px-2 rounded-lg shadow-lg">Historic Data</div>
        </div>

        <GitHubStyleAreaChart />
      </div>
    </div>
  );
}
