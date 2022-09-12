import "./Background.css"
import Carousel from "@itseasy21/react-elastic-carousel"



function Background() {

   //code for responsive carousel
   const breakPoints = [
    {width:1, itemsToShow:1},
    {width:550, itemsToShow:2},
    {width:768, itemsToShow:3},
    {width:1200, itemsToShow:4}
  ]





  return (
    <div className="background-container">
      <div className="intro">
        <h3>One of the most destructive wars in European history</h3>
        <h3>Total dead: 4,500,000-8,000,000</h3>
      </div>
      <Carousel breakPoints={breakPoints}>
        <div className="background-content">
          {/* Protestant reformation */}
        </div>
        <div className="background-content">
          {/* Peace of Augsburg */}
        </div>
        <div className="background-content">
          {/* Catholic & Protestant alliances */}
        </div>
        <div className="background-content">
          {/* Political instability */}
        </div>

      </Carousel>
    </div>
  );
}

export default Background;



// The Protestant Reformation was a religious movement that swept through 1500s Europe. Its main outcome was the Protestant branch of christianity, which referred to the many religious groups that separated from the Roman catholic Church due to differences in religious doctrine.

// It began in WIttenberg, Germany on October 31 1517. WHen Martin Luther, a monk, published his 95 theses or ideas about Christianity. These were contreversial as they directly contradicted the Catholic churche's ideas. Luther challenged the Catholic Church's role as an intermediary between people and god. He also highly criticised the indulgence system pushed by the church, which allowed people to purchase a certificate of pardeon, to cleanse e their sins. Luther argued against this practice of buying forgiveness, believing instead that salvation was a gift from god to those who had faith. This encouraged others to challenge catholic doctrine throughout europe, e.g. John Calvin in france, from whom the calvinist branch of christianity gets its name

// Religious conflicts between Protestants and Catholics in the Holy Roman Empire led to the Peace of Augsburg in  1555 which officially ended the relgigious struggle between the two groups and made the legal division of Christianity permanenet within the HRE. The main principle of this peace was that that a state's ruler could choose Lutheranism or Roman Catholicism as their official religion. Religious freedom was not sanctioned for other protestant sects such as calvinism.

// The protestant union was formed in 1608. It was a millitary alliance of protestant states that promised mutual aid and support against catholic interests. E.g. in 1610, members were able to ensure that the successor to the German state, Cleves-Julich, was a protestant.

// Anti-catholic incidents, tensions and worries over the growing power of protestants inspired catholic princes to band together. Maximillian, duke of bavaria, encouraged his neighbours to join together to counter the Protestant union, frming the catholic league in 1609. 

// Political instability in the empire


// Politically,	the	instability	of	the	Holy	Roman	Empire	also	contributed	to	the	conflict.	It	was	difficult	for	the	
// emperor	to	rule	a	disparate	population,	especially	one	free	to	make	its	own	alliances.	P

// Managing these issues was hampered by the fragmented nature of the Empire and its representative institutions, which included 300 Imperial Estates distributed across Germany, the Low Countries, Northern Italy and modern France. They ranged in size and importance from the seven Prince-electors who voted for the Holy Roman Emperor, down to Prince-bishoprics and Imperial cities like Hamburg.[m] Each of them also belonged to a regional Imperial circle, which primarily focused on defence and operated as autonomous bodies. Above them sat the Imperial Diet, which prior to 1663 assembled on an irregular basis and largely served as a forum for discussion, rather than legislation.[24] [n]

// Although Emperors were elected, since 1440 the position had been held by a member of the House of Habsburg, the largest single landowner in the Holy Roman Empire with territories containing over eight million subjects, including Austria, Bohemia and Hungary. 

// COnflicts such as the cologne war, caused when its ruler converted to calvinism