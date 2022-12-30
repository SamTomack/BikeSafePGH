Most of this should be able to be coded in HTML, CSS, and Javascript. 

Leaflet for the map 
Some kind of database for safe/sort of safe/not safe paths 
When a destination is entered, get info for closest respective paths and display path color accordingly

Use Nominatim, not LocationIQ, geocoding. No autocomplete, but more accurate and has better integration with leaflet. 

STYLE
    Collapsible sidebar that contains 
        to, from, search, and a list of fetched results. Click on them, place markers
        When search is clicked, sidebar collapses and the map makes the route 

MAKE PACKAGE JSON TO INSTALL EXPRESS AND CORS maybe 

If you want to slap in 13 lines and get a sort of working autcomplete, that's fine. but if you want more functionality, you have to engineer more functionality.

Use routing machine. Want itinerary, and it would be a pain to fetch, decode, plot, and style polylien and then build itinerary 