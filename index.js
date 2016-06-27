AFRAME.registerComponent('subtitle', {
  schema: {
    bevelEnabled: { default: false },
    bevelSize: { default: 8, min: 0 },
    bevelThickness: { default: 12, min: 0 },
    curveSegments: { default: 12, min: 0 },
    font: { default: 'helvetiker' },
    height: { default: 0.05, min: 0 },
    size: { default: 0.5, min: 0 },
    style: { default: 'normal', oneOf: [ 'normal', 'italics' ] },
    text: { default: '' },
    weight: { default: 'normal', oneOf: [ 'normal', 'bold' ] }
  },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function (oldData) {
    if (oldData == null || this.data.timeline != oldData.timeline)
    {
      this.data.pop = Popcorn(this.data.timeline);
      this.data.pop.parseSRT( this.data.srt, function(){});

      console.log (this.data.text);

      var el = this.el;

      this.data.pop.on("trackstart",
                       function(e)
                       {
                         console.log (e.text);
                         el.setAttribute("subtitle", "text", e.text);
                       });

      this.data.pop.on("trackend",
                       function(e)
                       {
                         console.log (e.text);
                         el.setAttribute("subtitle", "text", "...");
                       });

       this.data.text = "..."

    }

    this.el.getOrCreateObject3D('mesh', THREE.Mesh).geometry = getTextGeometry(this.data);
  }

});

function getTextGeometry (data) {
  var textGeometry  = new THREE.TextGeometry(data.text, data);

  var direction = new THREE.Vector3(0, 0, 1);
  var axis = new THREE.Vector3(0, 1, 0);
  var angle = Math.PI / 3;

  var modifier = new THREE.BendModifier();
  modifier.set(direction, axis, angle).modify( textGeometry );

  textGeometry.computeBoundingBox();
  var textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
//  text3D.position.set(-0.5 * textWidth, 500, 0);
  return textGeometry;

}

