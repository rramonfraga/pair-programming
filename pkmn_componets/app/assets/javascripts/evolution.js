( function (){
  "use strict";

  PokemonApp.Evolution = function (evolutions) {
    this.arr_evol = PokemonApp.Evolution.arrFromEvol(evolutions);
  };

  PokemonApp.Evolution.prototype.render = function () {
    var self = this;

    $.ajax({
      url: "/api/pokemon/" + this.id,
      success: function (response) {
        self.info = response;

        $(".js-pkmn-name-evol").text(self.info.name);
        $(".js-pkmn-number-evol").text(self.info.pkdx_id);

        var url_sprite = self.info.sprites[0].resource_uri;

        $.ajax({
          url: url_sprite,
          success: function (response) {
            var html = "<dd><img src='http://pokeapi.co" + response.image + "'></dd>";
            $(".js-pkmn-img-evol").html(html);
          } 
        });

        $(".js-pokemon-modal-evol").modal("show");
      }
    });
  }

  PokemonApp.Evolution.arrFromEvol = function (evolutions) {
    var uriSegments = evolutions.split("/");
    var secondLast = uriSegments.length - 2;
    return uriSegments[secondLast];
  };

  $(".js-pokemon-modal").on("ready",function () {

    $(".js-pkmn-btn-evol").on("click", function (event) {
      var $button = $(event.currentTarget);
      var evolutions = $button.data("evolutions");

      console.log(evolutions);

      var evolution = new PokemonApp.Evolution(evolutions);
      evolution.render();
      });
  });


})();