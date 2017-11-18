/**
 * LVL99 Tools
 *
 * Standalone tools that don't require any dependencies within the framework, but work alongside
 */

import Breakpoints from './breakpoints';
import Debug from './debug';
import Queue from './queue';
import TrackEvent from './trackevent';
import SmoothScroll from './smooth-scroll';

var utils = {
  Breakpoints: Breakpoints,
  Debug: Debug,
  Queue: Queue,
  TrackEvent: TrackEvent,
  SmoothScroll: SmoothScroll
};

export default tools;