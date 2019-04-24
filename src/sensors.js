import { DeviceEventEmitter } from "react-native";
import { Observable } from "rxjs";
import { publish, refCount } from "rxjs/operators";
import * as RNSensors from "./rnsensors";

const listenerKeys = new Map([
  ["accelerometer", "Accelerometer"],
  ["gyroscope", "Gyroscope"],
  ["magnetometer", "Magnetometer"],
  ["barometer", "Barometer"],
  ["gravity", "Gravity"],
  ["light", "Light"],
  ["linearAcceleration", "LinearAcceleration"],
  ["orientation", "Orientation"],
  ["proximity", "Proximity"],
]);

function createSensorObservable(sensorType) {
  return Observable.create(function subscribe(observer) {
    this.isSensorAvailable = false;

    this.unsubscribeCallback = () => {
      if (!this.isSensorAvailable) return;
      // stop the sensor
      RNSensors.stop(sensorType);
    };

    RNSensors.isAvailable(sensorType).then(
      () => {
        DeviceEventEmitter.addListener(listenerKeys.get(sensorType), data => {
          observer.next(data);
        });

        this.isSensorAvailable = true;

        // Start the sensor manager
        RNSensors.start(sensorType);
      },
      () => {
        observer.error(`Sensor ${sensorType} is not available`);
      }
    );

    return this.unsubscribeCallback;
  }).pipe(makeSingleton());
}

// As we only have one sensor we need to share it between the different consumers
function makeSingleton() {
  return source => source.pipe(publish(), refCount());
}

const accelerometer = createSensorObservable("accelerometer");
const gyroscope = createSensorObservable("gyroscope");
const magnetometer = createSensorObservable("magnetometer");
const barometer = createSensorObservable("barometer");
const gravity = createSensorObservable("gravity");
const light = createSensorObservable("light");
const linearAcceleration = createSensorObservable("linearAcceleration");
const orientation = createSensorObservable("orientation");
const proximity = createSensorObservable("proximity");

export default {
  gyroscope,
  accelerometer,
  magnetometer,
  barometer,
  gravity,
  light,
  linearAcceleration,
  orientation,
  proximity
};
