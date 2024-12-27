import Gauge from '../components/Gauge.jsx';
import GitHubStyleAreaChart from '../components/user/GitHubStyleAreaChart.jsx';
import { useTagStore } from '../store/useTagStore.js';

export default function HDPage() {
  const { tags, getTags, isTagsLoading, updateTag } = useTagStore();
  return (
    <div className="grid grid-cols-12 min-h-screen gap-2">
      <div className="col-span-3 m-3 bg-white shadow-lg rounded-lg p-4">
        <h3>
          Details: <strong>HD1 EOLT Motor-1 DE</strong>{' '}
        </h3>
        <h6>
          monitoring location: <strong>ST-65 Vibration Sensor</strong>{' '}
        </h6>
        <h6>
          Device Type: <strong>0</strong>
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
                <div key={tag._id} style={{ maxWidth: '170px', maxHeight: '170px' }}>
                  <Gauge
                    totalTicks={Number(tag.ticks)}
                    heading={tag.name}
                    min={Number(tag.min)}
                    max={Number(tag.max)}
                    type={'radial'}
                    alertMessage={tag.alertMessage}
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
