pragma solidity ^0.5.0;
contract Parking{
    string public name ;
    address payable parkingowner;
    uint public placeCount=0;
    mapping (uint => Place) public places;
    struct Place {
        uint id ;
        string position ;
        uint price ;
        address payable owner;
        bool purchased;
    }
    event placeCreated(
        uint id ,
        string position ,
        uint price ,
        address payable owner,
        bool purchased
    );
    event placePurchased(
        uint id ,
        string position ,
        uint price ,
        address payable owner,
        bool purchased
    );

    constructor() public {
        name = "Hamdi Neji parking";
        parkingowner=0x9AA2b8a1d120452A6c2D7B66262C58780dC82142;}
    function createPlace(string memory _position, uint _price )public  {
        require(msg.sender==parkingowner);
        require(bytes(_position).length > 0);
        require( _price > 0);
        placeCount++;
        places [placeCount] = Place(placeCount,_position,_price,parkingowner,false);
        emit placeCreated(placeCount,_position,_price,parkingowner,false);

 
    }
    function occupePlace(uint _id) public payable {
        Place memory _place = places[_id];
        require(_place.id>0 &&_place.id <= placeCount);
        require(msg.value >= _place.price);
        require(!_place.purchased);
        require(parkingowner!=msg.sender);
        _place.owner = msg.sender;
        _place.purchased = true ;
        places[_id]= _place;
        address(parkingowner).transfer(msg.value);
        emit placePurchased(placeCount,_place.position,_place.price,msg.sender,true);
    }
        function rendrePlace(uint _id) public   {
         Place memory _place = places[_id];
        require(_place.id>0 &&_place.id <= placeCount);
        require(parkingowner!=msg.sender);
        require(_place.purchased);
       _place.owner=parkingowner;
       _place.purchased=false;
       places[_id]=_place;
       emit placePurchased(placeCount,_place.position,_place.price,parkingowner,false);
    }
     }
