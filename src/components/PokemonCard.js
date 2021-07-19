import {
    MDBBtn,
    MDBBtnGroup,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardText,
    MDBCardTitle,
    MDBCol
} from 'mdb-react-ui-kit';
import {useShownPokemonsContext} from "../contexts/shownPokemonsContext";

export function PokemonCard(props) {
    const {pokemon} = props;
    const {removePokemon} = useShownPokemonsContext();

    if (!pokemon) return null;
    return <MDBCol size={6} sm={4} md={3} xl={2} className="mt-3">
        <MDBCard className="h-100">
            <MDBCardBody className="text-center p-1 mb-3">
                <MDBCardTitle>{pokemon.id}. {pokemon.name}</MDBCardTitle>
                <MDBCardText>Type: {pokemon.types}</MDBCardText>
                <MDBCardImage
                    src={pokemon.image}
                    alt={pokemon.name}
                    variant="bottom"
                    className="p-0 p-sm-2 p-md-2 w-100 h-auto"/>
                <MDBBtnGroup className='w-100'>
                    <MDBBtn variant="outline-primary"
                            onClick={() => removePokemon(pokemon.id)}>Remove</MDBBtn>
                </MDBBtnGroup>
            </MDBCardBody>
        </MDBCard>
    </MDBCol>
}