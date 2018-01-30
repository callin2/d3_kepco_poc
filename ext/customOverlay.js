function ovlInit(google) {

    // function transform(d) {
    //     console.log('ddd',d)
    //     var padding = 10;
    //     d = new google.maps.LatLng(d[1], d[0]);
    //     d = _projection.fromLatLngToDivPixel(d);
    //     return d3.select(this)
    //         .style("left", (d.x - padding) + "px")
    //         .style("top", (d.y - padding) + "px");
    // }

    function D3Overlay(station) {
        this.station_ = station;
        // this.map_ = map;
        this.div_ = null;

        // Explicitly call setMap on this overlay.
        this.setMap(map);
    }

    D3Overlay.prototype = new google.maps.OverlayView();

    D3Overlay.prototype.onRemove = function() {
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
    };

    D3Overlay.prototype.onAdd = function() {
        console.log('D3Overlay | added !!')

        this.div_ = d3.select(this.getPanes().overlayLayer)
            .append("div")
            .attr("class", "stations");
    };


    D3Overlay.prototype.draw = function(){
        var padding = 30


        console.log('D3Overlay | draw call')
        var projection = this.getProjection();

        function transform(d) {
            console.log('ddd',d)

            d = new google.maps.LatLng(d[1], d[0]);
            d = projection.fromLatLngToDivPixel(d);
            return d3.select(this)
                .style("left", (d.x - padding) + "px")
                .style("top", (d.y - padding) + "px");
        }

        console.log('this.station_', this.station_)

        var marker = this.div_.selectAll("svg")
            .data([[this.station_.ESTATION_LOC_LATITUDE, this.station_.ESTATION_LOC_LONGITUDE, 'xxx']])
            .each(transform) // update existing markers
            .enter().append("svg")
            .each(transform)
            .attr("class", "marker");

        // Add a circle.
        marker.append("circle")
            .attr("r", 4.5)
            .attr("cx", padding)
            .attr("cy", padding);

    };

    return D3Overlay;
}
