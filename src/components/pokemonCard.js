import {MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol} from 'mdb-react-ui-kit';

export function PokemonCard(props) {
    const {pokemon, setSelectedPokemon} = props;

    if (!pokemon) return null;
    return <MDBCol size={6} sm={4} md={3} xl={2} className="mt-3" onClick={setSelectedPokemon}>
        <MDBCard className="h-100">
            <MDBCardBody className="text-center p-1 mb-3">
                <MDBCardTitle>{pokemon.id}. {pokemon.name}</MDBCardTitle>
                <MDBCardText>Type: {pokemon.types}</MDBCardText>
            <MDBCardImage src={pokemon.image} alt={pokemon.name} variant="bottom" className="p-0 p-sm-2 p-md-2 w-100 h-auto"/>
            </MDBCardBody>
        </MDBCard>
    </MDBCol>
}