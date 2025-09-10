class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const animais = {
      'Rex': { tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
      'Mimi': { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
      'Fofo': { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
      'Zero': { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
      'Bola': { tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
      'Bebe': { tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
      'Loco': { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] }
    };

    const brinquedosValidos = new Set(['RATO', 'BOLA', 'LASER', 'CAIXA', 'NOVELO', 'SKATE']);

    const brinquedos1 = brinquedosPessoa1.split(',').map(b => b.trim());
    const brinquedos2 = brinquedosPessoa2.split(',').map(b => b.trim());
    const animaisOrdem = ordemAnimais.split(',').map(a => a.trim());
    


    const brinquedosSet1 = new Set(brinquedos1);
    const brinquedosSet2 = new Set(brinquedos2);

    

    if (brinquedosSet1.size !== brinquedos1.length || brinquedosSet2.size !== brinquedos2.length) {
      return { erro: 'Brinquedo inválido' };
    }
    
    for (const brinquedo of [...brinquedos1, ...brinquedos2]) {
      if (!brinquedosValidos.has(brinquedo)) {
        return { erro: 'Brinquedo inválido' };
      }
    }    
    
    const animaisSet = new Set(animaisOrdem);
    if (animaisSet.size !== animaisOrdem.length) {
      return { erro: 'Animal inválido' };
    }
    
    for (const animal of animaisOrdem) {
      if (!animais[animal]) {
        return { erro: 'Animal inválido' };
      }
    }
    
    

    const resultado = [];
    const animaisAdotadosP1 = [];
    const animaisAdotadosP2 = [];
    
    
    const podeAdotarMap = new Map();
    
    for (const nomeAnimal of animaisOrdem) {
      const animal = animais[nomeAnimal];
      const brinquedosDesejados = animal.brinquedos;
      
      const podeP1 = this.podeAdotar(brinquedos1, brinquedosDesejados, animal.tipo);
      const podeP2 = this.podeAdotar(brinquedos2, brinquedosDesejados, animal.tipo);
      
      podeAdotarMap.set(nomeAnimal, { podeP1, podeP2, animal });
    }
    
    
    for (const nomeAnimal of animaisOrdem) {
      const { podeP1, podeP2, animal } = podeAdotarMap.get(nomeAnimal);
            
      if (nomeAnimal === 'Loco') {
        const temCompanhia = this.verificarCompanhia(animaisAdotadosP1, animaisAdotadosP2, animaisOrdem);
        
        if (temCompanhia) {          
          const podeP1Companhia = brinquedos1.includes('SKATE') && brinquedos1.includes('RATO');
          const podeP2Companhia = brinquedos2.includes('SKATE') && brinquedos2.includes('RATO');
          
          this.processarAdocao(
            nomeAnimal, 
            podeP1Companhia, 
            podeP2Companhia, 
            animaisAdotadosP1, 
            animaisAdotadosP2, 
            resultado
          );
          continue;
        }
      }      
      
      this.processarAdocao(nomeAnimal,podeP1,podeP2,animaisAdotadosP1,animaisAdotadosP2,resultado);
    }
    
    resultado.sort();
    
    return { lista: resultado };
  }
  
  podeAdotar(brinquedosPessoa, brinquedosDesejados, tipoAnimal) {
    
    if (tipoAnimal === 'gato') {
      for (const brinquedo of brinquedosDesejados) {
        if (!brinquedosPessoa.includes(brinquedo)) {
          return false;
        }
      }
      return true;
    }
    
    
    let indexDesejado = 0;    
    for (const brinquedo of brinquedosPessoa) {
      if (indexDesejado < brinquedosDesejados.length && 
          brinquedo === brinquedosDesejados[indexDesejado]) {
        indexDesejado++;
      }
    }
    
    return indexDesejado === brinquedosDesejados.length;
  }
  
  
  verificarCompanhia(animaisAdotadosP1, animaisAdotadosP2, animaisOrdem) {    
    const totalAdotados = animaisAdotadosP1.length + animaisAdotadosP2.length;
    return totalAdotados > 0;
  }
  
  processarAdocao(nomeAnimal, podeP1, podeP2, animaisAdotadosP1, animaisAdotadosP2, resultado) {    
    if (podeP1 && podeP2) {
      resultado.push(`${nomeAnimal} - abrigo`);
    } 
    
    else if (podeP1 && !podeP2) {
      if (animaisAdotadosP1.length < 3) {
        resultado.push(`${nomeAnimal} - pessoa 1`);
        animaisAdotadosP1.push(nomeAnimal);
      } else {
        resultado.push(`${nomeAnimal} - abrigo`);
      }
    }
    
    else if (!podeP1 && podeP2) {
      if (animaisAdotadosP2.length < 3) {
        resultado.push(`${nomeAnimal} - pessoa 2`);
        animaisAdotadosP2.push(nomeAnimal);
      } else {
        resultado.push(`${nomeAnimal} - abrigo`);
      }
    }
    
    else {
      resultado.push(`${nomeAnimal} - abrigo`);
    }
  }
}

export { AbrigoAnimais };
