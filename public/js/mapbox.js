/* eslint-disable */

export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoic2Vyc2hpc2hrb3YiLCJhIjoiY2szYWV2MzI4MGJ0ejNlbXg4bG5oN295NyJ9.jlSysXJkGdd0cXabXiuXDw';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/sershishkov/ck3agi2nq04f41cnp3j3eft75',
    scrollZoom: false
    // center: [-118.113491, 34.111745],
    // zoom: 4,
    // interactive:false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    //Add popUp
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    //Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
