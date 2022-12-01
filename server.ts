import 'reflect-metadata';
import sourceMapSupport from 'source-map-support';
import { Ignitor } from '@adonisjs/core/build/standalone';

sourceMapSupport.install({ handleUncaughtExceptions: false });

new Ignitor(__dirname).httpServer().start();

console.log(`App is running at host: ${process.env.HOST} | port: ${process.env.PORT} |`);