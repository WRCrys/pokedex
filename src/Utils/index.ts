export function urlImage(id: number) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`
}

export function getGradientColor(typePokemon: string) {
    switch (typePokemon) {
        case 'grass':
            return ['#7CFFD0', '#4A7B42'];
        case 'fire':
            return ['#FF6969', '#FD9E5A'];
        case 'water':
            return ['#7CC0FF', '#5F29FF'];
        case 'bug':
            return ['#7CFFD0', '#729F3F'];
        case 'poison':
            return ['#E1BFEA', '#B97FC9'];
        case 'electric':
            return ['#F3E8A0', '#EED535'];
        case 'ground':
            return ['#F7DE3F', '#AA9741'];
        case 'fairy':
            return ['#F7D7EE', '#FDB9E9'];
        case 'fighting':
            return ['#DCBEAD', '#D56723'];
        case 'psychic':
            return ['#F6C1E0', '#F366B9'];
        case 'rock':
            return ['#D6CB99', '#A38C21'];
        case 'ghost':
            return ['#C6B3E5', '#7B62A3'];
        case 'ice':
            return ['#DAF1F8', '#51C3E7'];
        case 'dragon':
            return ['#F16E57', '#53A4CF'];
        case 'flying':
            return ['#BDB9B8', '#3DC7EF'];
        case 'dark':
            return ['#E7E3E3', '#707070'];
        default:
            return ['#E7EBED', '#A4ACAF'];
    }
}

export function getColorPerType(typePokemon: string) {
    switch (typePokemon) {
        case 'grass':
            return '#4A7B42';
        case 'fire':
            return '#FD9E5A';
        case 'water':
            return '#5F29FF';
        case 'bug':
            return '#729F3F';
        case 'poison':
            return '#B97FC9';
        case 'electric':
            return '#EED535';
        case 'ground':
            return '#AA9741';
        case 'fairy':
            return '#FDB9E9';
        case 'fighting':
            return '#D56723';
        case 'psychic':
            return '#F366B9';
        case 'rock':
            return '#A38C21';
        case 'ghost':
            return '#7B62A3';
        case 'ice':
            return '#51C3E7';
        case 'dragon':
            return '#53A4CF';
        case 'flying':
            return '#3DC7EF';
        case 'dark':
            return '#707070';
        default:
            return '#A4ACAF';
    }
}

export function formatIdPokemon(idPokemon: number) {
    
    switch (idPokemon.toString().length) {
        case 1:
            return `#00${idPokemon}`;
        case 2:
            return `#0${idPokemon}`;
        case 3:
            return `#${idPokemon}`;
        default:
            return `#00${idPokemon}`;
    }
}

export function formatName(name: string) {
    const arrLetters = [...name]

    arrLetters[0] = arrLetters[0].toUpperCase();

    return arrLetters.join('');
}

export function generateGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
  }