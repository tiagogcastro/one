import React, { useCallback } from 'react';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';
import type { Engine } from 'tsparticles-engine';
import { ISourceOptions } from 'tsparticles-engine';

import particlesOptions from './particles.json';

function ParticlesFrame() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="Particles">
      <Particles options={particlesOptions as ISourceOptions} init={particlesInit} />
    </div>
  );
}

export default ParticlesFrame;
