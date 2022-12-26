cards = [
    {
        name: "messi",
        img: "../Assignment-3/img/messi.jpeg",
        id: 1,
    },
    {
        name: "paredes",
        img: "../Assignment-3/img/paredes.jpeg",
        id: 2
    },
    {
        name: "martinezE",
        img: "../Assignment-3/img/martinezEmi.jpeg",
        id: 3
    },
    {
        name: "diMaria",
        img: "../Assignment-3/img/diMaria.jpeg",
        id: 4
    }, 
    {
        name: "dePaul",
        img: "../Assignment-3/img/dePaul.jpeg",
        id: 5
    },
    {
        name: "martinezLa",
        img: "../Assignment-3/img/martinezLa.jpeg",
        id: 6
    },
    {
        name: "alvarez",
        img: "../Assignment-3/img/alvarez.jpeg",
        id: 7
    },
    {
        name: "macAllister",
        img: "../Assignment-3/img/macAllister.jpeg",
        id: 10
    },
];

(function() {

	const memory = {

		init: function(cards) {
			this.$game = $(".game");
			this.$popUp = $(".pop-up");
			this.$overlay = $(".pop-up-overlay");
			this.$playAgainBtn = $("button.play-again");
			this.cardArray = $.merge(cards, cards);
			this.shuffleCards(this.cardArray);
			this.setup();
		},

		shuffleCards: function(cardArray) {
			this.$cards = $(this.shuffle(this.cardArray));
		},

		setup: function() {
			this.html = this.addHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.paused = false;
     	    this.guess = null;
			this.binding();
		},

		binding: function() {
			this.$memoryCards.on("click", this.clickedCard);
			this.$playAgainBtn.on("click", $.proxy(this.reset, this));
		},

		clickedCard: function() {
			let _ = memory;
			let $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matching") && !$card.find(".inside").hasClass("picked-card")) {
				$card.find(".inside").addClass("picked-card");
				if(!_.guess) {
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked-card")){
					$(".picked-card").addClass("matching");
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function() {
						$(".picked-card").removeClass("picked-card");
						memory.paused = false;
					}, 600);
				}

				if($(".matching").length == $(".card").length) {
					_.win();
				}
			}
		},

		win: function() {
			this.paused = true;
			setTimeout(function() {
				memory.showPopUp();
				memory.$game.fadeOut();
			}, 1000);
		},

		showPopUp: function() {
			this.$overlay.show();
			this.$popUp.fadeIn("slow");
		},

		hidePopUp: function() {
			this.$overlay.hide();
			this.$popUp.hide();
		},

		reset: function() {
			this.hidePopUp();
			this.shuffleCards(this.cardArray);
			this.setup();
			this.$game.show("slow");
		},

		shuffle: function(array) {
		    let counter = array.length, temp, index;
	   	    while (counter > 0) {
                index = Math.floor(Math.random() * counter);
                counter--;
                temp = array[counter];
                array[counter] = array[index];
                array[index] = temp;
	    	}

	    	return array;
		},

		addHTML: function() {
			let frag = "";
			this.$cards.each(function(k, b) {
				frag += '<div class="card" data-id="'+ b.id +'"><div class="inside">\
				<div class="front"><img src="'+ b.img +'"\
				alt="'+ b.name +'" /></div>\<div class="back"><img src="../Assignment-3/img/front-flag.png"\alt="flag"></div></div>\</div>';
			});
			return frag;
		}
	};

	memory.init(cards);

})();