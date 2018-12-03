import {
  LayerAdapter,
  GeoJsonAdapterOptions,
  GeoJsonAdapterLayerPaint,
  GetPaintCallback,
  GeoJsonAdapterLayerType
} from '@nextgis/webmap';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import GeoJson from 'ol/format/GeoJson';
import { Feature } from 'geojson';

let ID = 1;

export class GeoJsonAdapter implements LayerAdapter {

  name: string;

  addLayer(options?: GeoJsonAdapterOptions) {

    this.name = options.id || 'geojson-' + ID++;

    const features = (new GeoJSON()).readFeatures(options.data, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    });

    const vectorSource = new VectorSource({
      features
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: (f) => styleFunction(f, options.paint)
    });
    // this.layer = vectorLayer;
    return vectorLayer;
  }

}

const getImage = (paint) => {
  return new CircleStyle({ ...paint, stroke: new Stroke(paint), fill: new Fill(paint), });
};

// const styles = {
//   'Point': (paint) => {
//     return new Style({
//       image: getImage(paint)
//     });
//   },
//   'LineString': (paint) => new Style({
//     stroke: new Stroke(paint)
//   }),
//   'MultiLineString': (paint) => new Style({
//     stroke: new Stroke(paint)
//   }),
//   'MultiPoint': (paint) => {
//     return new Style({
//       image: getImage(paint)
//     });
//   },
//   'MultiPolygon': (paint) => new Style({
//     stroke: new Stroke(paint),
//     fill: new Fill(paint)
//   }),
//   'Polygon': (paint) => new Style({
//     stroke: new Stroke(paint),
//     fill: new Fill(paint)
//   }),
//   'GeometryCollection': (paint) => new Style({
//     stroke: new Stroke(paint),
//     fill: new Fill(paint),
//     image: getImage(paint)
//   }),
//   'Circle': (paint) => new Style({
//     stroke: new Stroke(paint),
//     fill: new Fill(paint)
//   }),
// };

const typeAlias: { [x: string]: GeoJsonAdapterLayerType } = {
  'Point': 'circle',
  'MultiPoint': 'circle',
  'LineString': 'line',
  'MultiLineString': 'line',
  'Polygon': 'fill',
  'MultiPolygon': 'fill',
  'Circle': 'circle'
};

function styleFunction(feature, paint: GeoJsonAdapterLayerPaint | GetPaintCallback) {
  if (typeof paint === 'function') {
    const geojson = new GeoJson();
    // @ts-ignore writeFeatureObject return JSON type, need Feature
    const f: Feature = geojson.writeFeatureObject(feature);
    return styleFunction(feature, paint(f));
  } else {
    const type = feature.getGeometry().getType();
    const style: { stroke?: Stroke, fill?: Fill, image?} = {};
    if (!paint.type) {
      const ta = typeAlias[type];
      paint.type = (ta === 'fill' || ta === 'line') ? 'path' :
        ('html' in paint || 'className' in paint) ? 'icon' : ta;
    }
    if (paint.type === 'path') {
      style.fill = new Fill(paint);
      if (paint.stroke || ['MultiLineString', 'LineString'].indexOf(type) !== -1) {
        style.stroke = new Stroke({
          width: paint.weight,
          color: paint.color
        });
      }
    } else if (paint.type === 'circle') {
      style.image = getImage(paint);
    } else if (paint.type === 'icon') {

      // const svg = paint.html;
      const svg = paint.html;

      style.image = new Icon({
        src: 'data:image/svg+xml,' + escape(svg),
        anchor: paint.iconAnchor,
        imgSize: paint.iconSize,
        anchorXUnits: 'pixels',
        anchorYUnits: 'pixels',
      });
    }
    return new Style(style);
  }
}