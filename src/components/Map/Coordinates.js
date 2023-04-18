const getMapJSON = require('dotted-map').getMapJSON;
const mapJsonString = getMapJSON({ height: 60, grid: 'vertical' });

export default mapJsonString;