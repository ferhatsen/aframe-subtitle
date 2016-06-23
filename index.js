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
  },

});

function getTextGeometry (data) {
  return new THREE.TextGeometry(data.text, data);
}


  /**
   * We should write:
   *     <a-entity timeline="#video" subtitle="text.srt"/>
   * or
   *     <a-subtitle src="text.srt" timeline="#video"/>
   */
