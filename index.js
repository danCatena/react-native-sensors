import sensors from "./src/sensors";
export { setUpdateInterval as setUpdateIntervalForType } from "./src/rnsensors";

export const SensorTypes = {
  accelerometer: "accelerometer",
  gyroscope: "gyroscope",
  magnetometer: "magnetometer",
  barometer: "barometer",
  gravity: "gravity",
  light: "light",
  linearAcceleration: "linearAcceleration",
  orientation: "orientation",
  proximity: "proximity"
};

export const { 
  accelerometer, 
  gyroscope, 
  magnetometer, 
  barometer,
  gravity,
  light,
  linearAcceleration,
  orientation,
  proximity
} = sensors;
export default sensors;
