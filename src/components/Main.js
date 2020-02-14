import React,{ Component } from 'react';
class Main extends Component {
    render (){
        return (
          <div className="int-kb">
              <h1> ajouter une place
               </h1>
               <form onSubmit={(event)=>{
                 event.preventDefault()
                 const position  = this.Placeposition.value.toString()
                 const price = window.web3.utils.toWei(this.PlacePrice.value.toString(),'Ether')
                 this.props.createPlace(position,price)
               }}>
                  <div className="form-group mr-sm-2">
                      <input
                      id="productName"
                      type="text"
                      ref={(input) =>{this.Placeposition = input}}
                      className="form-control"
                      placeholder="position du place"
                      required />
                  </div>
                  <div className="form-group mr-sm-2">
                    <input
                      id="productPrice"
                      type="text"
                      ref={(input) =>{this.PlacePrice = input}}
                      className="form-control"
                      placeholder="prix de la place"
                      required />
                  </div>
                <button type="submit" className="btn btn-primary">Add Place</button>
                </form>
        <p>&nbsp;</p>
        <h2>payer pour entrer au parking</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Position</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="placeList">
          {this.props.places.map((place,key) =>{
            return(
                  <tr key={key}>
                    <th scope="row">{place.id.toString()}</th>
                    <td>{place.position.toString()}</td>
                    <td>{window.web3.eth.utils.fromWei(place.price.toString())} Eth</td>
                    <td>{place.owner.toString()}</td>
                    <td>{!place.purchased?<button
                         name = {place.id}
                         value={place.price}
                         onClick={(event)=>{
                         this.props.occupePlace(place.id,event.target.value)
                         }}>
                    payer parking</button>:null }
                    </td>
                    <td>{place.purchased?<button
                      name = {place.id}
                      value={place.price}
                      onClick={(event)=>{
                      this.props.rendrePlace(place.id,event.target.value)
                      }}>
                 sortir parking</button>:null }
                 </td>
                  </tr>
            )})}
           
            
          </tbody>
        </table>
        </div>
        );
    }
}
export default Main;