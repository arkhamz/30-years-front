import "./Background.css"
import Carousel from "@itseasy21/react-elastic-carousel"



function Background() {

   //code for responsive carousel
   const breakPoints = [
    {width:1, itemsToShow:1},
    {width:550, itemsToShow:1},
    {width:768, itemsToShow:1},
    {width:1200, itemsToShow:1}
  ]

  return (
    <div className="background-container">
      {/* <div className="intro">
        <h3>One of the most destructive wars in European history</h3>
        <h3>Total dead: 4,500,000-8,000,000</h3>
      </div> */}
      <Carousel  breakPoints={breakPoints}>
        <div className="background-content">
          {/* Protestant reformation */}
          <h2>The Protestant Reformation</h2>
          <p>The protestant reformation was a <strong>religious movement</strong> that swept through 1500s Europe, resulting in the Protestant branch of Christianity. This referred to the many religious groups that separated from the Roman Catholic Church in religious doctrine</p>

          <p>The Protestant reformation began in Wittenberg, Germany, 1517. A Christian monk, <strong>Martin Luther</strong>, published his <strong>95 theses</strong>, or ideas, regarding Christianity. His work sparked controversy as they directly contradicted the teachings of the Catholic Church. His writings <strong>challenged the Catholic Church's role as an intermediary between people and God</strong>. He also highly <strong>criticised the indulgence system</strong> pushed by the church, which essentially allowed people to pay to have their sins forgiven. Luther argued that salvation was a gift from god to those who had faith. His writings encouraged others to challenge catholic doctrine throughout europe, e.g. John Calvin in france, from whom the calvinist branch of christianity gets its name </p>
        </div>
        <div className="background-content">
          {/* {Peace of AUgsburg} */}
          <h2>The Peace of Augsburg</h2>
          <p>The <strong>rapid spread of the Lutheran and Calvinist doctrines</strong> following the Protestant Reformation was met by a period of Roman <strong>Catholic resurgence</strong> known as <strong>Counter-Reformation</strong>.</p>

          <p><strong>Religious conflicts</strong> between Protestants and Catholics in the Holy Roman Empire led to the <strong>Peace of Augsburg</strong>(1555). This officially ended the relgigious struggle between the two groups and made the legal division of Christianity permanenet within the Holy Roman Empire. The main principle of this peace was that that <strong> a state's ruler could choose Lutheranism or Roman Catholicism</strong> as their official religion and religion of their subjects. Religious freedom was not sanctioned for other protestant sects such as calvinism.</p>
          <p></p>
        </div>
       
        <div className="background-content">
          {/* Catholic & Protestant alliances */}
          <h2>Christian Alliances</h2>
          <p>Religious conflicts such as the <strong>Cologne War</strong> (1583-1588) and <strong>Strasbourg Bishops' War</strong> (1592-1604) prompted the creation of the <strong>Catholic League</strong> and the <strong>Protestant Union</strong>, with the intention of safeguarding the interests of the Holy Roman Empire's Catholic and Protestant nobility respectively. </p>

          <p>The Protestant Union was formed in 1608. It was a millitary alliance of protestant German states of the Holy Roman Empire that promised mutual aid and support against Catholic interests. It included Calvinist and Lutheran states</p>

          <p>Anti-catholic incidents, tensions and worries over the growing power of Protestants inspired Catholic princes to band together. Maximillian, Duke of Bavaria, encouraged his neighbours to join together to counter the Protestant union, forming the Catholic League in 1609. </p>

          <p>These alliances entered their first conflict in 1609, when a succession crisis in the United Duchies of Jülich-Cleves-Berg sparked the War of the Jülich Succession. </p>
        </div>
        <div className="background-content">
          {/* Political instability */}
          <h2>Political Instability in the Holy Roman Empire</h2>
      
          <p>The Empire and its representative institutions were <strong>heavily fragmented</strong>. It included 300 Imperial Estates distributed across <strong>Germany</strong>, <strong>the Low Countries</strong>, <strong>Northern Italy</strong> and <strong>modern France</strong>. The institutions ranged in size and importance from the <strong>seven Prince-electors</strong> who voted for the Holy Roman Emperor, down to <strong>Prince-bishoprics</strong> and <strong>Imperial cities</strong> like Hamburg. Each of them also belonged to a regional <strong>Imperial circle</strong>, which primarily focused on defence and operated as autonomous bodies. Above them sat the <strong>Imperial Diet</strong>, which prior to 1663 assembled on an irregular basis and largely served as a forum for discussion, rather than legislation</p>

          <p>It	was	difficult	for	the emperor	to	rule	a	disparate	population,	especially	one	free	to	make	its	own	alliances.</p>

          <p>Although Holy Roman Emperors were elected, since 1440 the position had been held by a member of the <strong>House of Habsburg</strong>, the largest single landowner in the Holy Roman Empire with territories containing over eight million subjects, including Austria, Bohemia and Hungary</p>
        </div>

      </Carousel>
    </div>
  );
}

export default Background;
