export const getUserLocation = async (): Promise<[number, number]> => {
  const defaultCoordinates: [number, number] = [-3.7038, 40.4168];

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve([coords.longitude, coords.latitude]);
      },

      (err) => {
        console.log(err);
        reject(defaultCoordinates);
      },
    );
  });
};
