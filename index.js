import sensors from "./src/sensors";
export { setUpdateInterval as setUpdateIntervalForType } from "./src/rnsensors";

export const SensorTypes = {
  accelerometer: "accelerometer",
  gyroscope: "gyroscope",
  magnetometer: "magnetometer",
  barometer: "barometer",
  gravity: "gravity",
  light: "light",
  linearacceleration: "linearacceleration",
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
  linearacceleration,
  orientation,
  proximity
} = sensors;
export default sensors;
