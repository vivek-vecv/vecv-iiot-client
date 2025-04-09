import { useEffect } from 'react';
import Gauge from '../components/Gauge.jsx';
import axios from 'axios';

import { BsFillGearFill } from 'react-icons/bs';
import GitHubStyleAreaChart from '../components/user/GitHubStyleAreaChart.jsx';
import { useTagStore } from '../store/useTagStore.js';
import TagConfigurationModal from '../components/admin/TagConfiguration.jsx';

export default function HDPage() {
  const { tags, getTags, isTagsLoading, updateTag } = useTagStore();
  useEffect(() => {
    // Fetch tags immediately on mount
    getTags();
    // sendSms();
    // Set up an interval to fetch tags every 1 minute
    const interval = setInterval(() => {
      getTags();
    }, 60000); // 60000ms = 1 minute

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [getTags]);

  // Call the function when needed

  // console.log('------------------tags-------------------\n', tags);

  return (
    <div className="grid grid-cols-12 min-h-screen gap-2">
      <div className="col-span-3 m-3 bg-white shadow-lg rounded-lg p-4">
        <h3>
          Details: <strong>Robotic Washing Machine block</strong>{' '}
        </h3>
        <h6>
          monitoring location: <strong>Machine shop</strong>{' '}
        </h6>
        <h6>
          Device Type: <strong>CBM</strong>
        </h6>
        <h6>
          Machine:<strong>1</strong>
        </h6>
        <h6>
          Machine Group:<strong>1</strong>
        </h6>
        <h6>
          Model Name:<strong>N/A</strong>
        </h6>
        <h6>
          Manufacturer:<strong>CES</strong>
        </h6>
        <h6>
          Rated kWh Load:<strong>90KWh</strong>
        </h6>
      </div>

      <div className="col-span-9 flex flex-col gap-6 m-3 bg-white shadow-lg rounded-lg py-4">
        <div>
          <div className="flex justify-between content-center align-middle h-6">
            <div className="ms-4 w-fit font-bold bg-info text-white px-2 rounded-lg shadow-lg">Live values</div>
            <button className="btn btn-ghost" onClick={() => document.getElementById('tag-config-modal').showModal()}>
              <BsFillGearFill />
            </button>
          </div>
          <TagConfigurationModal />

          <div className="flex flex-wrap gap-3 justify-center py-4">
            {tags &&
              tags.map((tag) => (
                <div key={tag.tagName} style={{ maxWidth: '170px', maxHeight: '170px' }}>
                  <Gauge
                    totalTicks={5}
                    heading={tag.tagName}
                    min={Number(tag.guageMin)}
                    max={Number(tag.guageMax)}
                    maxValue={Number(tag.maxValue)}
                    minValue={Number(tag.minValue)}
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
