(function (cjs, an) {
  var p; // shortcut to reference prototypes
  var lib = {};
  var ss = {};
  var img = {};
  lib.ssMetadata = [];

  (lib.AnMovieClip = function () {
    this.currentSoundStreamInMovieclip;
    this.actionFrames = [];
    this.soundStreamDuration = new Map();
    this.streamSoundSymbolsList = [];

    this.gotoAndPlayForStreamSoundSync = function (positionOrLabel) {
      cjs.MovieClip.prototype.gotoAndPlay.call(this, positionOrLabel);
    };
    this.gotoAndPlay = function (positionOrLabel) {
      this.clearAllSoundStreams();
      this.startStreamSoundsForTargetedFrame(positionOrLabel);
      cjs.MovieClip.prototype.gotoAndPlay.call(this, positionOrLabel);
    };
    this.play = function () {
      this.clearAllSoundStreams();
      this.startStreamSoundsForTargetedFrame(this.currentFrame);
      cjs.MovieClip.prototype.play.call(this);
    };
    this.gotoAndStop = function (positionOrLabel) {
      cjs.MovieClip.prototype.gotoAndStop.call(this, positionOrLabel);
      this.clearAllSoundStreams();
    };
    this.stop = function () {
      cjs.MovieClip.prototype.stop.call(this);
      this.clearAllSoundStreams();
    };
    this.startStreamSoundsForTargetedFrame = function (targetFrame) {
      for (var index = 0; index < this.streamSoundSymbolsList.length; index++) {
        if (
          index <= targetFrame &&
          this.streamSoundSymbolsList[index] != undefined
        ) {
          for (var i = 0; i < this.streamSoundSymbolsList[index].length; i++) {
            var sound = this.streamSoundSymbolsList[index][i];
            if (sound.endFrame > targetFrame) {
              var targetPosition = Math.abs(
                ((targetFrame - sound.startFrame) / lib.properties.fps) * 1000
              );
              var instance = playSound(sound.id);
              var remainingLoop = 0;
              if (sound.offset) {
                targetPosition = targetPosition + sound.offset;
              } else if (sound.loop > 1) {
                var loop = targetPosition / instance.duration;
                remainingLoop = Math.floor(sound.loop - loop);
                if (targetPosition == 0) {
                  remainingLoop -= 1;
                }
                targetPosition = targetPosition % instance.duration;
              }
              instance.loop = remainingLoop;
              instance.position = Math.round(targetPosition);
              this.InsertIntoSoundStreamData(
                instance,
                sound.startFrame,
                sound.endFrame,
                sound.loop,
                sound.offset
              );
            }
          }
        }
      }
    };
    this.InsertIntoSoundStreamData = function (
      soundInstance,
      startIndex,
      endIndex,
      loopValue,
      offsetValue
    ) {
      this.soundStreamDuration.set(
        { instance: soundInstance },
        {
          start: startIndex,
          end: endIndex,
          loop: loopValue,
          offset: offsetValue,
        }
      );
    };
    this.clearAllSoundStreams = function () {
      var keys = this.soundStreamDuration.keys();
      for (var i = 0; i < this.soundStreamDuration.size; i++) {
        var key = keys.next().value;
        key.instance.stop();
      }
      this.soundStreamDuration.clear();
      this.currentSoundStreamInMovieclip = undefined;
    };
    this.stopSoundStreams = function (currentFrame) {
      if (this.soundStreamDuration.size > 0) {
        var keys = this.soundStreamDuration.keys();
        for (var i = 0; i < this.soundStreamDuration.size; i++) {
          var key = keys.next().value;
          var value = this.soundStreamDuration.get(key);
          if (value.end == currentFrame) {
            key.instance.stop();
            if (this.currentSoundStreamInMovieclip == key) {
              this.currentSoundStreamInMovieclip = undefined;
            }
            this.soundStreamDuration.delete(key);
          }
        }
      }
    };

    this.computeCurrentSoundStreamInstance = function (currentFrame) {
      if (this.currentSoundStreamInMovieclip == undefined) {
        if (this.soundStreamDuration.size > 0) {
          var keys = this.soundStreamDuration.keys();
          var maxDuration = 0;
          for (var i = 0; i < this.soundStreamDuration.size; i++) {
            var key = keys.next().value;
            var value = this.soundStreamDuration.get(key);
            if (value.end > maxDuration) {
              maxDuration = value.end;
              this.currentSoundStreamInMovieclip = key;
            }
          }
        }
      }
    };
    this.getDesiredFrame = function (currentFrame, calculatedDesiredFrame) {
      for (var frameIndex in this.actionFrames) {
        if (frameIndex > currentFrame && frameIndex < calculatedDesiredFrame) {
          return frameIndex;
        }
      }
      return calculatedDesiredFrame;
    };

    this.syncStreamSounds = function () {
      this.stopSoundStreams(this.currentFrame);
      this.computeCurrentSoundStreamInstance(this.currentFrame);
      if (this.currentSoundStreamInMovieclip != undefined) {
        var soundInstance = this.currentSoundStreamInMovieclip.instance;
        if (soundInstance.position != 0) {
          var soundValue = this.soundStreamDuration.get(
            this.currentSoundStreamInMovieclip
          );
          var soundPosition = soundValue.offset
            ? soundInstance.position - soundValue.offset
            : soundInstance.position;
          var calculatedDesiredFrame =
            soundValue.start + (soundPosition / 1000) * lib.properties.fps;
          if (soundValue.loop > 1) {
            calculatedDesiredFrame +=
              (((soundValue.loop - soundInstance.loop - 1) *
                soundInstance.duration) /
                1000) *
              lib.properties.fps;
          }
          calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
          var deltaFrame = calculatedDesiredFrame - this.currentFrame;
          if (deltaFrame >= 2) {
            this.gotoAndPlayForStreamSoundSync(
              this.getDesiredFrame(this.currentFrame, calculatedDesiredFrame)
            );
          }
        }
      }
    };
  }).prototype = p = new cjs.MovieClip();
  // symbols:
  // helper functions:

  function mc_symbol_clone() {
    var clone = this._cloneProps(
      new this.constructor(this.mode, this.startPosition, this.loop)
    );
    clone.gotoAndStop(this.currentFrame);
    clone.paused = this.paused;
    clone.framerate = this.framerate;
    return clone;
  }

  function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
    var prototype = cjs.extend(symbol, cjs.MovieClip);
    prototype.clone = mc_symbol_clone;
    prototype.nominalBounds = nominalBounds;
    prototype.frameBounds = frameBounds;
    return prototype;
  }

  (lib.backgroundsvg = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Layer_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .f('#00E4FF')
      .s()
      .p(
        'ECThBUZIAAh3IngAAIAAB4IgUgBIAAh3IngAAIAAB4IgUgBIAAh3IngAAIAAB4IgUgBIAAh3IngAAIAAB4IgUgBIAAh3IngAAIAAB4IgUgBIAAh3IngAAIAAB4IgUgBIAAh3IngAAIAAB4IgUgBIAAh3IngAAIAAB4IgUgBIAAh3IngAAIAAB4IgUgBIAAh3IngAAIAAB4IgUgBIAAh3IngAAIAAB4IgUgBIAAh3IngAAIAAB4IgUgBIAAh3IngAAIAAB4IgUgBIAAh3IngAAIAAB4IgUgBIAAh3IngAAIAAB4IgUgBIAAh3IngAAIAAB4IgUgBIAAh3IngAAIAAB4IgUgBIAAh3IngAAIAAB4IgUgBIAAh3InfAAIAAB4IgUgBIAAh3IngAAIAAB4IgUgBIAAh3IngAAIAAB4IgUgBIAAh3IngAAIAAB4IgUgBIAAh3IngAAIAAB4IgUgBIAAh3IngAAIAAB4IgUgBIAAh3IngAAIAAB4IgUgBIAAh3IngAAIAAB4IgUgBIAAh3IngAAIAAB4IgUgBIAAh3InfAAIAAB4IgUgBIAAh3IngAAIAAB4IgUgBIAAh3IngAAIAAB4IgUgBIAAh3IngAAIAAB4IgUgBIAAh3IngAAIAAB4IgUgBIAAh3IngAAIAAB4IgUgBIAAh3IngAAIAAB4IgUgBIAAh3IngAAIAAB4IgUgBIAAh3InhAAIAAB4IgUgBIAAh3IngAAIAAB4IgUgBIAAh3IngAAIAAB4IgUgBIAAh3IgyAAIABgUIAxAAIAAngIgyAAIABgUIAxAAIAAngIgyAAIABgUIAxAAIAAngIgyAAIABgUIAxAAIAAngIgyAAIABgUIAxAAIAAngIgyAAIABgUIAxAAIAAngIgyAAIABgUIAxAAIAAngIgyAAIABgUIAxAAIAAngIgyAAIABgUIAxAAIAAngIgyAAIABgUIAxAAIAAngIgyAAIABgUIAxAAIAAnfIgyAAIABgUIAxAAIAAngIgyAAIABgUIAxAAIAAngIgyAAIABgUIAxAAIAAngIgyAAIABgUIAxAAIAAngIgyAAIABgUIAxAAIAAngIgyAAIABgUIAxAAIAAngIgyAAIABgUIAxAAIAAngIgyAAIABgUIAxAAIAAngIgyAAIABgUIAxAAIAAngIgyAAIABgUIAxAAIAAngIgyAAIABgUIAyAAIAAigIAVACIAACeIHgAAIAAigIAUACIAACeIHgAAIAAigIAUACIAACeIHgAAIAAigIAUACIAACeIHgAAIAAigIAUACIAACeIHgAAIAAigIAUACIAACeIHgAAIAAigIAUACIAACeIHgAAIAAigIAUACIAACeIHgAAIAAigIAUACIAACeIHgAAIAAigIAUACIAACeIHgAAIAAigIAUACIAACeIHgAAIAAigIAUACIAACeIHgAAIAAigIAUACIAACeIHgAAIAAigIAUACIAACeIHgAAIAAigIAUACIAACeIHgAAIAAigIAUACIAACeIHgAAIAAigIAUACIAACeIHgAAIAAigIAUACIAACeIHgAAIAAigIAUACIAACeIHgAAIAAigIAUACIAACeIHfAAIAAigIAUACIAACeIHgAAIAAigIAUACIAACeIHgAAIAAigIAUACIAACeIHgAAIAAigIAUACIAACeIHgAAIAAigIAUACIAACeIHgAAIAAigIAUACIAACeIHgAAIAAigIAUACIAACeIHgAAIAAigIAUACIAACeIHgAAIAAigIAUACIAACeIHgAAIAAigIAUACIAACeIHgAAIAAigIAUACIAACeIHgAAIAAigIAUACIAACeIHgAAIAAigIAUACIAACeIHgAAIAAigIAUACIAACeIHgAAIAAigIAUACIAACaIHgAAIAAigIAUABIAACgIHgAAIAAigIAUABIAACgIHgAAIAAigIAUABIAACgIHgAAIAAigIAUABIAACgICAAAIAAAUIiBAAIAAHgICBAAIgBAUIhtAAIAAHgICAAAIgBAUIiAAAIAAHgICAAAIgBAUIiAAAIAAHgICAAAIgBAUIiAAAIAAHgICAAAIgBAUIiAAAIAAHgICAAAIgBAUIiAAAIAAHgICAAAIgBAUIiAAAIAAHgICAAAIgBAUIiAAAIAAHgICAAAIgBAUIiAAAIAAHgICAAAIgBAUIiAAAIAAHfICAAAIgBAUIiAAAIAAHgICAAAIgBAUIiAAAIAAHgICAAAIgBAUIiAAAIAAHgICAAAIgBAUIiAAAIAAHgICAAAIgBAUIiAAAIAAHgICAAAIgBAUIiAAAIAAHgICAAAIgBAUIiAAAIAAHgICAAAIgBAUIiAAAIAAHgICAAAIgBAUIiAAAIAAHgICAAAIAAAUIiBAAIAAHgICBAAIgBAUIiBAAIAAB4gECMCBSOIHgAAIAAngIngAAgECEOBSOIHgAAIAAngIngAAgEB8aBSOIHgAAIAAngIngAAgEB0mBSOIHgAAIAAngIngAAgEBsyBSOIHgAAIAAngIngAAgEBk+BSOIHgAAIAAngIngAAgEBdKBSOIHgAAIAAngIngAAgEBVWBSOIHgAAIAAngIngAAgEBNiBSOIHgAAIAAngIngAAgEBFuBSOIHgAAIAAngIngAAgEA96BSOIHgAAIAAngIngAAgEA2GBSOIHgAAIAAngIngAAgEAuSBSOIHgAAIAAngIngAAgEAmeBSOIHgAAIAAngIngAAgEAeqBSOIHgAAIAAngIngAAgEAW2BSOIHgAAIAAngIngAAgEAPCBSOIHgAAIAAngIngAAgEAHPBSOIHfAAIAAngInfAAgEgAkBSOIHfAAIAAngInfAAgEgIYBSOIHgAAIAAngIngAAgEgQMBSOIHgAAIAAngIngAAgEgYABSOIHgAAIAAngIngAAgEgf0BSOIHgAAIAAngIngAAgEgnoBSOIHgAAIAAngIngAAgEgvcBSOIHgAAIAAngIngAAgEg3QBSOIHgAAIAAngIngAAgEg/EBSOIHgAAIAAngIngAAgEhG4BSOIHgAAIAAngIngAAgEhOsBSOIHgAAIAAngIngAAgEhWgBSOIHgAAIAAngIngAAgEheUBSOIHgAAIAAngIngAAgEhmIBSOIHgAAIAAngIngAAgEht8BSOIHgAAIAAngIngAAgEh1xBSOIHgAAIAAngIngAAgEh9lBSOIHgAAIAAngIngAAgEiFZBSOIHgAAIAAngIngAAgEiNMBSOIHfAAIAAngInfAAgEiVBBSOIHhAAIAAngInhAAgECMCBKaIHgAAIAAngIngAAgECEOBKaIHgAAIAAngIngAAgEB8aBKaIHgAAIAAngIngAAgEB0mBKaIHgAAIAAngIngAAgEBsyBKaIHgAAIAAngIngAAgEBk+BKaIHgAAIAAngIngAAgEBdKBKaIHgAAIAAngIngAAgEBVWBKaIHgAAIAAngIngAAgEBNiBKaIHgAAIAAngIngAAgEBFuBKaIHgAAIAAngIngAAgEA96BKaIHgAAIAAngIngAAgEA2GBKaIHgAAIAAngIngAAgEAuSBKaIHgAAIAAngIngAAgEAmeBKaIHgAAIAAngIngAAgEAeqBKaIHgAAIAAngIngAAgEAW2BKaIHgAAIAAngIngAAgEAPCBKaIHgAAIAAngIngAAgEAHOBKaIHgAAIAAngIngAAgEgAkBKaIHfAAIAAngInfAAgEgIYBKaIHgAAIAAngIngAAgEgQMBKaIHgAAIAAngIngAAgEgYABKaIHgAAIAAngIngAAgEgf0BKaIHgAAIAAngIngAAgEgnoBKaIHgAAIAAngIngAAgEgvcBKaIHgAAIAAngIngAAgEg3QBKaIHgAAIAAngIngAAgEg/EBKaIHgAAIAAngIngAAgEhG4BKaIHgAAIAAngIngAAgEhOsBKaIHgAAIAAngIngAAgEhWgBKaIHgAAIAAngIngAAgEheUBKaIHgAAIAAngIngAAgEhmIBKaIHgAAIAAngIngAAgEht8BKaIHgAAIAAngIngAAgEh1xBKaIHgAAIAAngIngAAgEh9lBKaIHgAAIAAngIngAAgEiFZBKaIHgAAIAAngIngAAgEiNNBKaIHgAAIAAngIngAAgEiVABKaIHgAAIAAngInhAAgECMCBCmIHgAAIAAngIngAAgECEOBCmIHgAAIAAngIngAAgEB8aBCmIHgAAIAAngIngAAgEB0mBCmIHgAAIAAngIngAAgEBsyBCmIHgAAIAAngIngAAgEBk+BCmIHgAAIAAngIngAAgEBdKBCmIHgAAIAAngIngAAgEBVWBCmIHgAAIAAngIngAAgEBNiBCmIHgAAIAAngIngAAgEBFuBCmIHgAAIAAngIngAAgEA96BCmIHgAAIAAngIngAAgEA2GBCmIHgAAIAAngIngAAgEAuSBCmIHgAAIAAngIngAAgEAmeBCmIHgAAIAAngIngAAgEAeqBCmIHgAAIAAngIngAAgEAW2BCmIHgAAIAAngIngAAgEAPCBCmIHgAAIAAngIngAAgEAHOBCmIHgAAIAAngIngAAgEgAkBCmIHfAAIAAngInfAAgEgIYBCmIHgAAIAAngIngAAgEgQMBCmIHgAAIAAngIngAAgEgYABCmIHgAAIAAngIngAAgEgf0BCmIHgAAIAAngIngAAgEgnoBCmIHgAAIAAngIngAAgEgvcBCmIHgAAIAAngIngAAgEg3QBCmIHgAAIAAngIngAAgEg/EBCmIHgAAIAAngIngAAgEhG4BCmIHgAAIAAngIngAAgEhOsBCmIHgAAIAAngIngAAgEhWgBCmIHgAAIAAngIngAAgEheUBCmIHgAAIAAngIngAAgEhmIBCmIHgAAIAAngIngAAgEht8BCmIHgAAIAAngIngAAgEh1xBCmIHgAAIAAngIngAAgEh9lBCmIHgAAIAAngIngAAgEiFZBCmIHgAAIAAngIngAAgEiNNBCmIHgAAIAAngIngAAgEiVABCmIHgAAIAAngInhAAgECMCA6yIHgAAIAAngIngAAgECEOA6yIHgAAIAAngIngAAgEB8aA6yIHgAAIAAngIngAAgEB0mA6yIHgAAIAAngIngAAgEBsyA6yIHgAAIAAngIngAAgEBk+A6yIHgAAIAAngIngAAgEBdKA6yIHgAAIAAngIngAAgEBVWA6yIHgAAIAAngIngAAgEBNiA6yIHgAAIAAngIngAAgEBFuA6yIHgAAIAAngIngAAgEA96A6yIHgAAIAAngIngAAgEA2GA6yIHgAAIAAngIngAAgEAuSA6yIHgAAIAAngIngAAgEAmeA6yIHgAAIAAngIngAAgEAeqA6yIHgAAIAAngIngAAgEAW2A6yIHgAAIAAngIngAAgEAPCA6yIHgAAIAAngIngAAgEAHOA6yIHgAAIAAngIngAAgEgAkA6yIHfAAIAAngInfAAgEgIYA6yIHgAAIAAngIngAAgEgQMA6yIHgAAIAAngIngAAgEgYAA6yIHgAAIAAngIngAAgEgf0A6yIHgAAIAAngIngAAgEgnoA6yIHgAAIAAngIngAAgEgvcA6yIHgAAIAAngIngAAgEg3QA6yIHgAAIAAngIngAAgEg/EA6yIHgAAIAAngIngAAgEhG4A6yIHgAAIAAngIngAAgEhOsA6yIHgAAIAAngIngAAgEhWgA6yIHgAAIAAngIngAAgEheUA6yIHgAAIAAngIngAAgEhmIA6yIHgAAIAAngIngAAgEht8A6yIHgAAIAAngIngAAgEh1xA6yIHgAAIAAngIngAAgEh9lA6yIHgAAIAAngIngAAgEiFZA6yIHgAAIAAngIngAAgEiNNA6yIHgAAIAAngIngAAgEiVAA6yIHgAAIAAngInhAAgECMCAy+IHgAAIAAngIngAAgECEOAy+IHgAAIAAngIngAAgEB8aAy+IHgAAIAAngIngAAgEB0mAy+IHgAAIAAngIngAAgEBsyAy+IHgAAIAAngIngAAgEBk+Ay+IHgAAIAAngIngAAgEBdKAy+IHgAAIAAngIngAAgEBVWAy+IHgAAIAAngIngAAgEBNiAy+IHgAAIAAngIngAAgEBFuAy+IHgAAIAAngIngAAgEA96Ay+IHgAAIAAngIngAAgEA2GAy+IHgAAIAAngIngAAgEAuSAy+IHgAAIAAngIngAAgEAmeAy+IHgAAIAAngIngAAgEAeqAy+IHgAAIAAngIngAAgEAW2Ay+IHgAAIAAngIngAAgEAPCAy+IHgAAIAAngIngAAgEAHOAy+IHgAAIAAngIngAAgEgAkAy+IHfAAIAAngInfAAgEgIYAy+IHgAAIAAngIngAAgEgQMAy+IHgAAIAAngIngAAgEgYAAy+IHgAAIAAngIngAAgEgf0Ay+IHgAAIAAngIngAAgEgnoAy+IHgAAIAAngIngAAgEgvcAy+IHgAAIAAngIngAAgEg3QAy+IHgAAIAAngIngAAgEg/EAy+IHgAAIAAngIngAAgEhG4Ay+IHgAAIAAngIngAAgEhOsAy+IHgAAIAAngIngAAgEhWgAy+IHgAAIAAngIngAAgEheUAy+IHgAAIAAngIngAAgEhmIAy+IHgAAIAAngIngAAgEht8Ay+IHgAAIAAngIngAAgEh1xAy+IHgAAIAAngIngAAgEh9lAy+IHgAAIAAngIngAAgEiFZAy+IHgAAIAAngIngAAgEiNNAy+IHgAAIAAngIngAAgEiVAAy+IHgAAIAAngInhAAgECMCArKIHgAAIAAngIngAAgECEOArKIHgAAIAAngIngAAgEB8aArKIHgAAIAAngIngAAgEB0mArKIHgAAIAAngIngAAgEBsyArKIHgAAIAAngIngAAgEBk+ArKIHgAAIAAngIngAAgEBdKArKIHgAAIAAngIngAAgEBVWArKIHgAAIAAngIngAAgEBNiArKIHgAAIAAngIngAAgEBFuArKIHgAAIAAngIngAAgEA96ArKIHgAAIAAngIngAAgEA2GArKIHgAAIAAngIngAAgEAuSArKIHgAAIAAngIngAAgEAmeArKIHgAAIAAngIngAAgEAeqArKIHgAAIAAngIngAAgEAW2ArKIHgAAIAAngIngAAgEAPCArKIHgAAIAAngIngAAgEAHOArKIHgAAIAAngIngAAgEgAkArKIHfAAIAAngInfAAgEgIYArKIHgAAIAAngIngAAgEgQMArKIHgAAIAAngIngAAgEgYAArKIHgAAIAAngIngAAgEgf0ArKIHgAAIAAngIngAAgEgnoArKIHgAAIAAngIngAAgEgvcArKIHgAAIAAngIngAAgEg3QArKIHgAAIAAngIngAAgEg/EArKIHgAAIAAngIngAAgEhG4ArKIHgAAIAAngIngAAgEhOsArKIHgAAIAAngIngAAgEhWgArKIHgAAIAAngIngAAgEheUArKIHgAAIAAngIngAAgEhmIArKIHgAAIAAngIngAAgEht8ArKIHgAAIAAngIngAAgEh1xArKIHgAAIAAngIngAAgEh9lArKIHgAAIAAngIngAAgEiFZArKIHgAAIAAngIngAAgEiNNArKIHgAAIAAngIngAAgEiVAArKIHgAAIAAngInhAAgECMCAjWIHgAAIAAngIngAAgECEOAjWIHgAAIAAngIngAAgEB8aAjWIHgAAIAAngIngAAgEB0mAjWIHgAAIAAngIngAAgEBsyAjWIHgAAIAAngIngAAgEBk+AjWIHgAAIAAngIngAAgEBdKAjWIHgAAIAAngIngAAgEBVWAjWIHgAAIAAngIngAAgEBNiAjWIHgAAIAAngIngAAgEBFuAjWIHgAAIAAngIngAAgEA96AjWIHgAAIAAngIngAAgEA2GAjWIHgAAIAAngIngAAgEAuSAjWIHgAAIAAngIngAAgEAmeAjWIHgAAIAAngIngAAgEAeqAjWIHgAAIAAngIngAAgEAW2AjWIHgAAIAAngIngAAgEAPCAjWIHgAAIAAngIngAAgEAHOAjWIHgAAIAAngIngAAgEgAkAjWIHfAAIAAngInfAAgEgIYAjWIHgAAIAAngIngAAgEgQMAjWIHgAAIAAngIngAAgEgYAAjWIHgAAIAAngIngAAgEgf0AjWIHgAAIAAngIngAAgEgnoAjWIHgAAIAAngIngAAgEgvcAjWIHgAAIAAngIngAAgEg3QAjWIHgAAIAAngIngAAgEg/EAjWIHgAAIAAngIngAAgEhG4AjWIHgAAIAAngIngAAgEhOsAjWIHgAAIAAngIngAAgEhWgAjWIHgAAIAAngIngAAgEheUAjWIHgAAIAAngIngAAgEhmIAjWIHgAAIAAngIngAAgEht8AjWIHgAAIAAngIngAAgEh1xAjWIHgAAIAAngIngAAgEh9lAjWIHgAAIAAngIngAAgEiFZAjWIHgAAIAAngIngAAgEiNNAjWIHgAAIAAngIngAAgEiVAAjWIHgAAIAAngInhAAgECMCAbiIHgAAIAAngIngAAgECEOAbiIHgAAIAAngIngAAgEB8aAbiIHgAAIAAngIngAAgEB0mAbiIHgAAIAAngIngAAgEBsyAbiIHgAAIAAngIngAAgEBk+AbiIHgAAIAAngIngAAgEBdKAbiIHgAAIAAngIngAAgEBVWAbiIHgAAIAAngIngAAgEBNiAbiIHgAAIAAngIngAAgEBFuAbiIHgAAIAAngIngAAgEA96AbiIHgAAIAAngIngAAgEA2GAbiIHgAAIAAngIngAAgEAuSAbiIHgAAIAAngIngAAgEAmeAbiIHgAAIAAngIngAAgAeqbiIHgAAIAAngIngAAgAW2biIHgAAIAAngIngAAgAPCbiIHgAAIAAngIngAAgAHObiIHgAAIAAngIngAAgAgkbiIHfAAIAAngInfAAgAoYbiIHgAAIAAngIngAAgAwMbiIHgAAIAAngIngAAgA4AbiIHgAAIAAngIngAAgA/0biIHgAAIAAngIngAAgEgnoAbiIHgAAIAAngIngAAgEgvcAbiIHgAAIAAngIngAAgEg3QAbiIHgAAIAAngIngAAgEg/EAbiIHgAAIAAngIngAAgEhG4AbiIHgAAIAAngIngAAgEhOsAbiIHgAAIAAngIngAAgEhWgAbiIHgAAIAAngIngAAgEheUAbiIHgAAIAAngIngAAgEhmIAbiIHgAAIAAngIngAAgEht8AbiIHgAAIAAngIngAAgEh1xAbiIHgAAIAAngIngAAgEh9lAbiIHgAAIAAngIngAAgEiFZAbiIHgAAIAAngIngAAgEiNNAbiIHgAAIAAngIngAAgEiVAAbiIHgAAIAAngInhAAgECMCATuIHgAAIAAngIngAAgECEOATuIHgAAIAAngIngAAgEB8aATuIHgAAIAAngIngAAgEB0mATuIHgAAIAAngIngAAgEBsyATuIHgAAIAAngIngAAgEBk+ATuIHgAAIAAngIngAAgEBdKATuIHgAAIAAngIngAAgEBVWATuIHgAAIAAngIngAAgEBNiATuIHgAAIAAngIngAAgEBFuATuIHgAAIAAngIngAAgEA96ATuIHgAAIAAngIngAAgEA2GATuIHgAAIAAngIngAAgEAuSATuIHgAAIAAngIngAAgEAmeATuIHgAAIAAngIngAAgAeqTuIHgAAIAAngIngAAgAW2TuIHgAAIAAngIngAAgAPCTuIHgAAIAAngIngAAgAHOTuIHgAAIAAngIngAAgAgkTuIHfAAIAAngInfAAgAoYTuIHgAAIAAngIngAAgAwMTuIHgAAIAAngIngAAgA4ATuIHgAAIAAngIngAAgA/0TuIHgAAIAAngIngAAgEgnoATuIHgAAIAAngIngAAgEgvcATuIHgAAIAAngIngAAgEg3QATuIHgAAIAAngIngAAgEg/EATuIHgAAIAAngIngAAgEhG4ATuIHgAAIAAngIngAAgEhOsATuIHgAAIAAngIngAAgEhWgATuIHgAAIAAngIngAAgEheUATuIHgAAIAAngIngAAgEhmIATuIHgAAIAAngIngAAgEht8ATuIHgAAIAAngIngAAgEh1xATuIHgAAIAAngIngAAgEh9lATuIHgAAIAAngIngAAgEiFZATuIHgAAIAAngIngAAgEiNNATuIHgAAIAAngIngAAgEiVAATuIHgAAIAAngInhAAgECMCAL6IHgAAIAAngIngAAgECEOAL6IHgAAIAAngIngAAgEB8aAL6IHgAAIAAngIngAAgEB0mAL6IHgAAIAAngIngAAgEBsyAL6IHgAAIAAngIngAAgEBk+AL6IHgAAIAAngIngAAgEBdKAL6IHgAAIAAngIngAAgEBVWAL6IHgAAIAAngIngAAgEBNiAL6IHgAAIAAngIngAAgEBFuAL6IHgAAIAAngIngAAgEA96AL6IHgAAIAAngIngAAgEA2GAL6IHgAAIAAngIngAAgEAuSAL6IHgAAIAAngIngAAgEAmeAL6IHgAAIAAngIngAAgAeqL6IHgAAIAAngIngAAgAW2L6IHgAAIAAngIngAAgAPCL6IHgAAIAAngIngAAgAHOL6IHgAAIAAngIngAAgAgkL6IHfAAIAAngInfAAgAoYL6IHgAAIAAngIngAAgAwML6IHgAAIAAngIngAAgA4AL6IHgAAIAAngIngAAgA/0L6IHgAAIAAngIngAAgEgnoAL6IHgAAIAAngIngAAgEgvcAL6IHgAAIAAngIngAAgEg3QAL6IHgAAIAAngIngAAgEg/EAL6IHgAAIAAngIngAAgEhG4AL6IHgAAIAAngIngAAgEhOsAL6IHgAAIAAngIngAAgEhWgAL6IHgAAIAAngIngAAgEheUAL6IHgAAIAAngIngAAgEhmIAL6IHgAAIAAngIngAAgEht8AL6IHgAAIAAngIngAAgEh1xAL6IHgAAIAAngIngAAgEh9lAL6IHgAAIAAngIngAAgEiFZAL6IHgAAIAAngIngAAgEiNNAL6IHgAAIAAngIngAAgEiVAAL6IHgAAIAAngInhAAgECMCAEGIHgAAIAAnfIngAAgECEOAEGIHgAAIAAnfIngAAgEB8aAEGIHgAAIAAnfIngAAgEB0mAEGIHgAAIAAnfIngAAgEBsyAEGIHgAAIAAnfIngAAgEBk+AEGIHgAAIAAnfIngAAgEBdKAEGIHgAAIAAnfIngAAgEBVWAEGIHgAAIAAnfIngAAgEBNiAEGIHgAAIAAnfIngAAgEBFuAEGIHgAAIAAnfIngAAgEA96AEGIHgAAIAAnfIngAAgEA2GAEGIHgAAIAAnfIngAAgEAuSAEGIHgAAIAAnfIngAAgEAmeAEGIHgAAIAAnfIngAAgAeqEGIHgAAIAAnfIngAAgAW2EGIHgAAIAAnfIngAAgAPCEGIHgAAIAAnfIngAAgAHOEGIHgAAIAAnfIngAAgAgkEGIHfAAIAAnfInfAAgAoYEGIHgAAIAAnfIngAAgAwMEGIHgAAIAAnfIngAAgA4AEGIHgAAIAAnfIngAAgA/0EGIHgAAIAAnfIngAAgEgnoAEGIHgAAIAAnfIngAAgEgvcAEGIHgAAIAAnfIngAAgEg3QAEGIHgAAIAAnfIngAAgEg/EAEGIHgAAIAAnfIngAAgEhG4AEGIHgAAIAAnfIngAAgEhOsAEGIHgAAIAAnfIngAAgEhWgAEGIHgAAIAAnfIngAAgEheUAEGIHgAAIAAnfIngAAgEhmIAEGIHgAAIAAnfIngAAgEht8AEGIHgAAIAAnfIngAAgEh1xAEGIHgAAIAAnfIngAAgEh9lAEGIHgAAIAAnfIngAAgEiFZAEGIHgAAIAAnfIngAAgEiNNAEGIHgAAIAAnfIngAAgEiVAAEGIHgAAIAAnfInhAAgECMCgDtIHgAAIAAngIngAAgECEOgDtIHgAAIAAngIngAAgEB8agDtIHgAAIAAngIngAAgEB0mgDtIHgAAIAAngIngAAgEBsygDtIHgAAIAAngIngAAgEBk+gDtIHgAAIAAngIngAAgEBdKgDtIHgAAIAAngIngAAgEBVWgDtIHgAAIAAngIngAAgEBNigDtIHgAAIAAngIngAAgEBFugDtIHgAAIAAngIngAAgEA96gDtIHgAAIAAngIngAAgEA2GgDtIHgAAIAAngIngAAgEAuSgDtIHgAAIAAngIngAAgEAmegDtIHgAAIAAngIngAAgAeqjtIHgAAIAAngIngAAgAW2jtIHgAAIAAngIngAAgAPCjtIHgAAIAAngIngAAgAHOjtIHgAAIAAngIngAAgAgkjtIHfAAIAAngInfAAgAoYjtIHgAAIAAngIngAAgAwMjtIHgAAIAAngIngAAgA4AjtIHgAAIAAngIngAAgA/0jtIHgAAIAAngIngAAgEgnogDtIHgAAIAAngIngAAgEgvcgDtIHgAAIAAngIngAAgEg3QgDtIHgAAIAAngIngAAgEg/EgDtIHgAAIAAngIngAAgEhG4gDtIHgAAIAAngIngAAgEhOsgDtIHgAAIAAngIngAAgEhWggDtIHgAAIAAngIngAAgEheUgDtIHgAAIAAngIngAAgEhmIgDtIHgAAIAAngIngAAgEht8gDtIHgAAIAAngIngAAgEh1xgDtIHgAAIAAngIngAAgEh9lgDtIHgAAIAAngIngAAgEiFZgDtIHgAAIAAngIngAAgEiNNgDtIHgAAIAAngIngAAgEiVAgDtIHgAAIAAngInhAAgECMCgLhIHgAAIAAngIngAAgECEOgLhIHgAAIAAngIngAAgEB8agLhIHgAAIAAngIngAAgEB0mgLhIHgAAIAAngIngAAgEBsygLhIHgAAIAAngIngAAgEBk+gLhIHgAAIAAngIngAAgEBdKgLhIHgAAIAAngIngAAgEBVWgLhIHgAAIAAngIngAAgEBNigLhIHgAAIAAngIngAAgEBFugLhIHgAAIAAngIngAAgEA96gLhIHgAAIAAngIngAAgEA2GgLhIHgAAIAAngIngAAgEAuSgLhIHgAAIAAngIngAAgEAmegLhIHgAAIAAngIngAAgAeqrhIHgAAIAAngIngAAgAW2rhIHgAAIAAngIngAAgAPCrhIHgAAIAAngIngAAgAHOrhIHgAAIAAngIngAAgAgkrhIHfAAIAAngInfAAgAoYrhIHgAAIAAngIngAAgAwMrhIHgAAIAAngIngAAgA4ArhIHgAAIAAngIngAAgA/0rhIHgAAIAAngIngAAgEgnogLhIHgAAIAAngIngAAgEgvcgLhIHgAAIAAngIngAAgEg3QgLhIHgAAIAAngIngAAgEg/EgLhIHgAAIAAngIngAAgEhG4gLhIHgAAIAAngIngAAgEhOsgLhIHgAAIAAngIngAAgEhWggLhIHgAAIAAngIngAAgEheUgLhIHgAAIAAngIngAAgEhmIgLhIHgAAIAAngIngAAgEht8gLhIHgAAIAAngIngAAgEh1xgLhIHgAAIAAngIngAAgEh9lgLhIHgAAIAAngIngAAgEiFZgLhIHgAAIAAngIngAAgEiNNgLhIHgAAIAAngIngAAgEiVAgLhIHgAAIAAngInhAAgECMCgTVIHgAAIAAngIngAAgECEOgTVIHgAAIAAngIngAAgEB8agTVIHgAAIAAngIngAAgEB0mgTVIHgAAIAAngIngAAgEBsygTVIHgAAIAAngIngAAgEBk+gTVIHgAAIAAngIngAAgEBdKgTVIHgAAIAAngIngAAgEBVWgTVIHgAAIAAngIngAAgEBNigTVIHgAAIAAngIngAAgEBFugTVIHgAAIAAngIngAAgEA96gTVIHgAAIAAngIngAAgEA2GgTVIHgAAIAAngIngAAgEAuSgTVIHgAAIAAngIngAAgEAmegTVIHgAAIAAngIngAAgAeqzVIHgAAIAAngIngAAgAW2zVIHgAAIAAngIngAAgAPCzVIHgAAIAAngIngAAgAHOzVIHgAAIAAngIngAAgAgkzVIHfAAIAAngInfAAgAoYzVIHgAAIAAngIngAAgAwMzVIHgAAIAAngIngAAgA4AzVIHgAAIAAngIngAAgA/0zVIHgAAIAAngIngAAgEgnogTVIHgAAIAAngIngAAgEgvcgTVIHgAAIAAngIngAAgEg3QgTVIHgAAIAAngIngAAgEg/EgTVIHgAAIAAngIngAAgEhG4gTVIHgAAIAAngIngAAgEhOsgTVIHgAAIAAngIngAAgEhWggTVIHgAAIAAngIngAAgEheUgTVIHgAAIAAngIngAAgEhmIgTVIHgAAIAAngIngAAgEht8gTVIHgAAIAAngIngAAgEh1xgTVIHgAAIAAngIngAAgEh9lgTVIHgAAIAAngIngAAgEiFZgTVIHgAAIAAngIngAAgEiNNgTVIHgAAIAAngIngAAgEiVAgTVIHgAAIAAngInhAAgECMCgbJIHgAAIAAngIngAAgECEOgbJIHgAAIAAngIngAAgEB8agbJIHgAAIAAngIngAAgEB0mgbJIHgAAIAAngIngAAgEBsygbJIHgAAIAAngIngAAgEBk+gbJIHgAAIAAngIngAAgEBdKgbJIHgAAIAAngIngAAgEBVWgbJIHgAAIAAngIngAAgEBNigbJIHgAAIAAngIngAAgEBFugbJIHgAAIAAngIngAAgEA96gbJIHgAAIAAngIngAAgEA2GgbJIHgAAIAAngIngAAgEAuSgbJIHgAAIAAngIngAAgEAmegbJIHgAAIAAngIngAAgAeq7JIHgAAIAAngIngAAgAW27JIHgAAIAAngIngAAgAPC7JIHgAAIAAngIngAAgAHO7JIHgAAIAAngIngAAgAgk7JIHfAAIAAngInfAAgAoY7JIHgAAIAAngIngAAgAwM7JIHgAAIAAngIngAAgA4A7JIHgAAIAAngIngAAgA/07JIHgAAIAAngIngAAgEgnogbJIHgAAIAAngIngAAgEgvcgbJIHgAAIAAngIngAAgEg3QgbJIHgAAIAAngIngAAgEg/EgbJIHgAAIAAngIngAAgEhG4gbJIHgAAIAAngIngAAgEhOsgbJIHgAAIAAngIngAAgEhWggbJIHgAAIAAngIngAAgEheUgbJIHgAAIAAngIngAAgEhmIgbJIHgAAIAAngIngAAgEht8gbJIHgAAIAAngIngAAgEh1xgbJIHgAAIAAngIngAAgEh9lgbJIHgAAIAAngIngAAgEiFZgbJIHgAAIAAngIngAAgEiNNgbJIHgAAIAAngIngAAgEiVAgbJIHgAAIAAngInhAAgECMCgi9IHgAAIAAngIngAAgECEOgi9IHgAAIAAngIngAAgEB8agi9IHgAAIAAngIngAAgEB0mgi9IHgAAIAAngIngAAgEBsygi9IHgAAIAAngIngAAgEBk+gi9IHgAAIAAngIngAAgEBdKgi9IHgAAIAAngIngAAgEBVWgi9IHgAAIAAngIngAAgEBNigi9IHgAAIAAngIngAAgEBFugi9IHgAAIAAngIngAAgEA96gi9IHgAAIAAngIngAAgEA2Ggi9IHgAAIAAngIngAAgEAuSgi9IHgAAIAAngIngAAgEAmegi9IHgAAIAAngIngAAgEAeqgi9IHgAAIAAngIngAAgEAW2gi9IHgAAIAAngIngAAgEAPCgi9IHgAAIAAngIngAAgEAHOgi9IHgAAIAAngIngAAgEgAkgi9IHfAAIAAngInfAAgEgIYgi9IHgAAIAAngIngAAgEgQMgi9IHgAAIAAngIngAAgEgYAgi9IHgAAIAAngIngAAgEgf0gi9IHgAAIAAngIngAAgEgnogi9IHgAAIAAngIngAAgEgvcgi9IHgAAIAAngIngAAgEg3Qgi9IHgAAIAAngIngAAgEg/Egi9IHgAAIAAngIngAAgEhG4gi9IHgAAIAAngIngAAgEhOsgi9IHgAAIAAngIngAAgEhWggi9IHgAAIAAngIngAAgEheUgi9IHgAAIAAngIngAAgEhmIgi9IHgAAIAAngIngAAgEht8gi9IHgAAIAAngIngAAgEh1xgi9IHgAAIAAngIngAAgEh9lgi9IHgAAIAAngIngAAgEiFZgi9IHgAAIAAngIngAAgEiNNgi9IHgAAIAAngIngAAgEiVAgi9IHgAAIAAngInhAAgECMCgqxIHgAAIAAngIngAAgECEOgqxIHgAAIAAngIngAAgEB8agqxIHgAAIAAngIngAAgEB0mgqxIHgAAIAAngIngAAgEBsygqxIHgAAIAAngIngAAgEBk+gqxIHgAAIAAngIngAAgEBdKgqxIHgAAIAAngIngAAgEBVWgqxIHgAAIAAngIngAAgEBNigqxIHgAAIAAngIngAAgEBFugqxIHgAAIAAngIngAAgEA96gqxIHgAAIAAngIngAAgEA2GgqxIHgAAIAAngIngAAgEAuSgqxIHgAAIAAngIngAAgEAmegqxIHgAAIAAngIngAAgEAeqgqxIHgAAIAAngIngAAgEAW2gqxIHgAAIAAngIngAAgEAPCgqxIHgAAIAAngIngAAgEAHOgqxIHgAAIAAngIngAAgEgAkgqxIHfAAIAAngInfAAgEgIYgqxIHgAAIAAngIngAAgEgQMgqxIHgAAIAAngIngAAgEgYAgqxIHgAAIAAngIngAAgEgf0gqxIHgAAIAAngIngAAgEgnogqxIHgAAIAAngIngAAgEgvcgqxIHgAAIAAngIngAAgEg3QgqxIHgAAIAAngIngAAgEg/EgqxIHgAAIAAngIngAAgEhG4gqxIHgAAIAAngIngAAgEhOsgqxIHgAAIAAngIngAAgEhWggqxIHgAAIAAngIngAAgEheUgqxIHgAAIAAngIngAAgEhmIgqxIHgAAIAAngIngAAgEht8gqxIHgAAIAAngIngAAgEh1xgqxIHgAAIAAngIngAAgEh9lgqxIHgAAIAAngIngAAgEiFZgqxIHgAAIAAngIngAAgEiNNgqxIHgAAIAAngIngAAgEiVAgqxIHgAAIAAngInhAAgECMCgylIHgAAIAAngIngAAgECEOgylIHgAAIAAngIngAAgEB8agylIHgAAIAAngIngAAgEB0mgylIHgAAIAAngIngAAgEBsygylIHgAAIAAngIngAAgEBk+gylIHgAAIAAngIngAAgEBdKgylIHgAAIAAngIngAAgEBVWgylIHgAAIAAngIngAAgEBNigylIHgAAIAAngIngAAgEBFugylIHgAAIAAngIngAAgEA96gylIHgAAIAAngIngAAgEA2GgylIHgAAIAAngIngAAgEAuSgylIHgAAIAAngIngAAgEAmegylIHgAAIAAngIngAAgEAeqgylIHgAAIAAngIngAAgEAW2gylIHgAAIAAngIngAAgEAPCgylIHgAAIAAngIngAAgEAHOgylIHgAAIAAngIngAAgEgAkgylIHfAAIAAngInfAAgEgIYgylIHgAAIAAngIngAAgEgQMgylIHgAAIAAngIngAAgEgYAgylIHgAAIAAngIngAAgEgf0gylIHgAAIAAngIngAAgEgnogylIHgAAIAAngIngAAgEgvcgylIHgAAIAAngIngAAgEg3QgylIHgAAIAAngIngAAgEg/EgylIHgAAIAAngIngAAgEhG4gylIHgAAIAAngIngAAgEhOsgylIHgAAIAAngIngAAgEhWggylIHgAAIAAngIngAAgEheUgylIHgAAIAAngIngAAgEhmIgylIHgAAIAAngIngAAgEht8gylIHgAAIAAngIngAAgEh1xgylIHgAAIAAngIngAAgEh9lgylIHgAAIAAngIngAAgEiFZgylIHgAAIAAngIngAAgEiNNgylIHgAAIAAngIngAAgEiVAgylIHgAAIAAngInhAAgECMCg6ZIHgAAIAAngIngAAgECEOg6ZIHgAAIAAngIngAAgEB8ag6ZIHgAAIAAngIngAAgEB0mg6ZIHgAAIAAngIngAAgEBsyg6ZIHgAAIAAngIngAAgEBk+g6ZIHgAAIAAngIngAAgEBdKg6ZIHgAAIAAngIngAAgEBVWg6ZIHgAAIAAngIngAAgEBNig6ZIHgAAIAAngIngAAgEBFug6ZIHgAAIAAngIngAAgEA96g6ZIHgAAIAAngIngAAgEA2Gg6ZIHgAAIAAngIngAAgEAuSg6ZIHgAAIAAngIngAAgEAmeg6ZIHgAAIAAngIngAAgEAeqg6ZIHgAAIAAngIngAAgEAW2g6ZIHgAAIAAngIngAAgEAPCg6ZIHgAAIAAngIngAAgEAHOg6ZIHgAAIAAngIngAAgEgAkg6ZIHfAAIAAngInfAAgEgIYg6ZIHgAAIAAngIngAAgEgQMg6ZIHgAAIAAngIngAAgEgYAg6ZIHgAAIAAngIngAAgEgf0g6ZIHgAAIAAngIngAAgEgnog6ZIHgAAIAAngIngAAgEgvcg6ZIHgAAIAAngIngAAgEg3Qg6ZIHgAAIAAngIngAAgEg/Eg6ZIHgAAIAAngIngAAgEhG4g6ZIHgAAIAAngIngAAgEhOsg6ZIHgAAIAAngIngAAgEhWgg6ZIHgAAIAAngIngAAgEheUg6ZIHgAAIAAngIngAAgEhmIg6ZIHgAAIAAngIngAAgEht8g6ZIHgAAIAAngIngAAgEh1xg6ZIHgAAIAAngIngAAgEh9lg6ZIHgAAIAAngIngAAgEiFZg6ZIHgAAIAAngIngAAgEiNNg6ZIHgAAIAAngIngAAgEiVAg6ZIHgAAIAAngInhAAgECMChCNIHgAAIAAngIngAAgECEOhCNIHgAAIAAngIngAAgEB8ahCNIHgAAIAAngIngAAgEB0mhCNIHgAAIAAngIngAAgEBsyhCNIHgAAIAAngIngAAgEBk+hCNIHgAAIAAngIngAAgEBdKhCNIHgAAIAAngIngAAgEBVWhCNIHgAAIAAngIngAAgEBNihCNIHgAAIAAngIngAAgEBFuhCNIHgAAIAAngIngAAgEA96hCNIHgAAIAAngIngAAgEA2GhCNIHgAAIAAngIngAAgEAuShCNIHgAAIAAngIngAAgEAmehCNIHgAAIAAngIngAAgEAeqhCNIHgAAIAAngIngAAgEAW2hCNIHgAAIAAngIngAAgEAPChCNIHgAAIAAngIngAAgEAHOhCNIHgAAIAAngIngAAgEgAkhCNIHfAAIAAngInfAAgEgIYhCNIHgAAIAAngIngAAgEgQMhCNIHgAAIAAngIngAAgEgYAhCNIHgAAIAAngIngAAgEgf0hCNIHgAAIAAngIngAAgEgnohCNIHgAAIAAngIngAAgEgvchCNIHgAAIAAngIngAAgEg3QhCNIHgAAIAAngIngAAgEg/EhCNIHgAAIAAngIngAAgEhG4hCNIHgAAIAAngIngAAgEhOshCNIHgAAIAAngIngAAgEhWghCNIHgAAIAAngIngAAgEheUhCNIHgAAIAAngIngAAgEhmIhCNIHgAAIAAngIngAAgEht8hCNIHgAAIAAngIngAAgEh1xhCNIHgAAIAAngIngAAgEh9lhCNIHgAAIAAngIngAAgEiFZhCNIHgAAIAAngIngAAgEiNNhCNIHgAAIAAngIngAAgEiVAhCNIHgAAIAAngInhAAgECMChKBIHgAAIAAngIngAAgECEOhKBIHgAAIAAngIngAAgEB8ahKBIHgAAIAAngIngAAgEB0mhKBIHgAAIAAngIngAAgEBsyhKBIHgAAIAAngIngAAgEBk+hKBIHgAAIAAngIngAAgEBdKhKBIHgAAIAAngIngAAgEBVWhKBIHgAAIAAngIngAAgEBNihKBIHgAAIAAngIngAAgEBFuhKBIHgAAIAAngIngAAgEA96hKBIHgAAIAAngIngAAgEA2GhKBIHgAAIAAngIngAAgEAuShKBIHgAAIAAngIngAAgEAmehKBIHgAAIAAngIngAAgEAeqhKBIHgAAIAAngIngAAgEAW2hKBIHgAAIAAngIngAAgEAPChKBIHgAAIAAngIngAAgEAHOhKBIHgAAIAAngIngAAgEgAkhKBIHfAAIAAngInfAAgEgIYhKBIHgAAIAAngIngAAgEgQMhKBIHgAAIAAngIngAAgEgYAhKBIHgAAIAAngIngAAgEgf0hKBIHgAAIAAngIngAAgEgnohKBIHgAAIAAngIngAAgEgvchKBIHgAAIAAngIngAAgEg3QhKBIHgAAIAAngIngAAgEg/EhKBIHgAAIAAngIngAAgEhG4hKBIHgAAIAAngIngAAgEhOshKBIHgAAIAAngIngAAgEhWghKBIHgAAIAAngIngAAgEheUhKBIHgAAIAAngIngAAgEhmIhKBIHgAAIAAngIngAAgEht8hKBIHgAAIAAngIngAAgEh1xhKBIHgAAIAAngIngAAgEh9lhKBIHgAAIAAngIngAAgEiFZhKBIHgAAIAAngIngAAgEiNNhKBIHgAAIAAngIngAAgEiVAhKBIHgAAIAAngInhAAg'
      );
    this.shape.setTransform(2878.575, 581.75);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics.f('#00CCFF').s().p('EiV/BUYMAAAiovMEr/AAAMAAACovg');
    this.shape_1.setTransform(2877.65, 581.95);

    this.timeline.addTween(
      cjs.Tween.get({})
        .to({ state: [{ t: this.shape_1 }, { t: this.shape }] })
        .wait(1)
    );

    this._renderFirstFrame();
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(1917.7, 41.6, 1921.8, 1080.4);

  (lib._7svg = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Layer_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .f('#1D1D1B')
      .s()
      .p(
        'AiDCEQg2g3AAhNQAAhMA2g3QA3g2BMAAQBNAAA2A2QA3A3AABMQAABNg3A3Qg2A2hNAAQhMAAg3g2g'
      );
    this.shape.setTransform(1318.6, 218.625);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics
      .f('#F6F6F6')
      .s()
      .p(
        'AiDCDQg2g2AAhNQAAhMA2g2QA3g3BMAAQBNAAA3A3QA2A2AABMQAABNg2A2Qg3A3hNAAQhMAAg3g3g'
      );
    this.shape_1.setTransform(318.65, 468.625);

    this.shape_2 = new cjs.Shape();
    this.shape_2.graphics
      .f('#000000')
      .s()
      .p(
        'AiCCEQg3g3AAhNQAAhMA3g3QA2g2BMAAQBNAAA2A2QA3A3AABMQAABNg3A3Qg2A2hNAAQhMAAg2g2g'
      );
    this.shape_2.setTransform(768.625, 18.625);

    this.shape_3 = new cjs.Shape();
    this.shape_3.graphics
      .f('#F6F6F6')
      .s()
      .p(
        'AiDCDQg2g2AAhNQAAhMA2g2QA3g3BMAAQBNAAA3A3QA2A2AABMQAABNg2A2Qg2A3hOAAQhMAAg3g3g'
      );
    this.shape_3.setTransform(1618.6, 368.625);

    this.shape_4 = new cjs.Shape();
    this.shape_4.graphics
      .f('#E911A0')
      .s()
      .p(
        'AiCCEQg3g3AAhNQAAhMA3g3QA2g2BMAAQBNAAA2A2QA3A3AABMQAABNg3A3Qg2A2hNAAQhMAAg2g2g'
      );
    this.shape_4.setTransform(868.6, 318.625);

    this.shape_5 = new cjs.Shape();
    this.shape_5.graphics
      .f('#E911A0')
      .s()
      .p(
        'AiDCEQg2g3AAhNQAAhMA2g3QA3g2BMAAQBNAAA3A2QA2A3AABMQAABNg2A3Qg3A2hNAAQhMAAg3g2g'
      );
    this.shape_5.setTransform(18.625, 168.625);

    this.timeline.addTween(
      cjs.Tween.get({})
        .to({
          state: [
            { t: this.shape_5 },
            { t: this.shape_4 },
            { t: this.shape_3 },
            { t: this.shape_2 },
            { t: this.shape_1 },
            { t: this.shape },
          ],
        })
        .wait(1)
    );

    this._renderFirstFrame();
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(0, 0, 1637.2, 487.2);

  (lib._6svg = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Layer_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .f('#1D1D1B')
      .s()
      .p(
        'AiDCDQg2g2AAhNQAAhMA2g2QA3g3BMAAQBNAAA2A3QA3A2AABMQAABNg3A2Qg2A3hNAAQhMAAg3g3g'
      );
    this.shape.setTransform(1018.55, 268.625);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics
      .f('#F6F6F6')
      .s()
      .p(
        'AiCCEQg3g3AAhNQAAhMA3g3QA2g2BMAAQBNAAA3A2QA2A3AABMQAABNg2A3Qg3A2hNAAQhMAAg2g2g'
      );
    this.shape_1.setTransform(218.6, 68.625);

    this.shape_2 = new cjs.Shape();
    this.shape_2.graphics
      .f('#000000')
      .s()
      .p(
        'AiCCDQg3g2AAhNQAAhMA3g2QA2g3BMAAQBNAAA3A3QA2A2AABMQAABNg2A2Qg3A3hNAAQhMAAg2g3g'
      );
    this.shape_2.setTransform(18.6, 418.625);

    this.shape_3 = new cjs.Shape();
    this.shape_3.graphics
      .f('#F6F6F6')
      .s()
      .p(
        'AiCCDQg3g2AAhNQAAhMA3g2QA2g3BMAAQBNAAA2A3QA3A2AABMQAABNg3A2Qg2A3hNAAQhMAAg2g3g'
      );
    this.shape_3.setTransform(568.575, 468.625);

    this.shape_4 = new cjs.Shape();
    this.shape_4.graphics
      .f('#E911A0')
      .s()
      .p(
        'AiDCEQg2g3AAhNQAAhMA2g3QA3g2BMAAQBNAAA2A2QA3A3AABMQAABNg3A3Qg2A2hNAAQhMAAg3g2g'
      );
    this.shape_4.setTransform(918.55, 18.625);

    this.timeline.addTween(
      cjs.Tween.get({})
        .to({
          state: [
            { t: this.shape_4 },
            { t: this.shape_3 },
            { t: this.shape_2 },
            { t: this.shape_1 },
            { t: this.shape },
          ],
        })
        .wait(1)
    );

    this._renderFirstFrame();
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(0, 0, 1037.2, 487.2);

  (lib._5svg = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Layer_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .f('#1D1D1B')
      .s()
      .p(
        'AiCCEQg3g3AAhNQAAhMA3g3QA2g2BMAAQBNAAA3A2QA2A3AABMQAABNg2A3Qg3A2hNAAQhMAAg2g2g'
      );
    this.shape.setTransform(18.6, 218.625);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics
      .f('#F6F6F6')
      .s()
      .p(
        'AiCCEQg3g3AAhNQAAhMA3g3QA2g2BMAAQBNAAA2A2QA3A3AABMQAABNg3A3Qg2A2hNAAQhMAAg2g2g'
      );
    this.shape_1.setTransform(568.575, 68.625);

    this.shape_2 = new cjs.Shape();
    this.shape_2.graphics
      .f('#000000')
      .s()
      .p(
        'AiCCDQg3g2AAhNQAAhMA3g2QA2g3BMAAQBNAAA2A3QA3A2AABMQAABNg3A2Qg2A3hNAAQhMAAg2g3g'
      );
    this.shape_2.setTransform(318.575, 618.625);

    this.shape_3 = new cjs.Shape();
    this.shape_3.graphics
      .f('#E911A0')
      .s()
      .p(
        'AiCCDQg3g2AAhNQAAhMA3g2QA2g3BMAAQBNAAA2A3QA3A2AABMQAABNg3A2Qg2A3hNAAQhMAAg2g3g'
      );
    this.shape_3.setTransform(468.575, 518.625);

    this.shape_4 = new cjs.Shape();
    this.shape_4.graphics
      .f('#E911A0')
      .s()
      .p(
        'AiCCEQg3g3AAhNQAAhMA3g3QA2g2BMAAQBNAAA2A2QA3A3AABMQAABNg3A3Qg2A2hNAAQhMAAg2g2g'
      );
    this.shape_4.setTransform(818.55, 18.625);

    this.timeline.addTween(
      cjs.Tween.get({})
        .to({
          state: [
            { t: this.shape_4 },
            { t: this.shape_3 },
            { t: this.shape_2 },
            { t: this.shape_1 },
            { t: this.shape },
          ],
        })
        .wait(1)
    );

    this._renderFirstFrame();
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(0, 0, 837.2, 637.2);

  (lib._4svg = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Layer_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .f('#1D1D1B')
      .s()
      .p(
        'AiCCEQg3g3AAhNQAAhMA3g3QA2g2BMAAQBNAAA3A2QA2A3AABMQAABNg2A3Qg3A2hNAAQhMAAg2g2g'
      );
    this.shape.setTransform(18.6, 68.625);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics
      .f('#E911A0')
      .s()
      .p(
        'AiCCEQg3g3AAhNQAAhMA3g3QA2g2BMAAQBNAAA3A2QA2A3AABMQAABNg2A3Qg3A2hNAAQhMAAg2g2g'
      );
    this.shape_1.setTransform(718.55, 168.625);

    this.shape_2 = new cjs.Shape();
    this.shape_2.graphics
      .f('#000000')
      .s()
      .p(
        'AiDCDQg2g2AAhNQAAhMA2g2QA3g3BMAAQBNAAA3A3QA2A2AABMQAABNg2A2Qg3A3hNAAQhMAAg3g3g'
      );
    this.shape_2.setTransform(868.55, 468.625);

    this.shape_3 = new cjs.Shape();
    this.shape_3.graphics
      .f('#E911A0')
      .s()
      .p(
        'AiCCDQg3g2AAhNQAAhMA3g2QA2g3BMAAQBNAAA2A3QA3A2AABMQAABNg3A2Qg2A3hNAAQhMAAg2g3g'
      );
    this.shape_3.setTransform(268.575, 418.625);

    this.shape_4 = new cjs.Shape();
    this.shape_4.graphics
      .f('#F6F6F6')
      .s()
      .p(
        'AiCCEQg3g3AAhNQAAhMA3g3QA2g2BMAAQBNAAA2A2QA3A3AABMQAABNg3A3Qg2A2hNAAQhMAAg2g2g'
      );
    this.shape_4.setTransform(1168.55, 18.625);

    this.timeline.addTween(
      cjs.Tween.get({})
        .to({
          state: [
            { t: this.shape_4 },
            { t: this.shape_3 },
            { t: this.shape_2 },
            { t: this.shape_1 },
            { t: this.shape },
          ],
        })
        .wait(1)
    );

    this._renderFirstFrame();
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(0, 0, 1187.2, 487.2);

  (lib._3svg = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Layer_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .f('#F6F6F6')
      .s()
      .p(
        'AiDCEQg2g3AAhNQAAhMA2g3QA3g2BMAAQBNAAA3A2QA2A3AABMQAABNg2A3Qg3A2hNAAQhMAAg3g2g'
      );
    this.shape.setTransform(18.625, 168.625);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics
      .f('#1D1D1B')
      .s()
      .p(
        'AiCCEQg3g3AAhNQAAhMA3g3QA2g2BMAAQBNAAA2A2QA3A3AABMQAABNg3A3Qg2A2hNAAQhMAAg2g2g'
      );
    this.shape_1.setTransform(868.6, 18.625);

    this.shape_2 = new cjs.Shape();
    this.shape_2.graphics
      .f('#000000')
      .s()
      .p(
        'AiCCDQg3g2AAhNQAAhMA3g2QA2g3BMAAQBNAAA2A3QA3A2AABMQAABNg3A2Qg2A3hNAAQhMAAg2g3g'
      );
    this.shape_2.setTransform(568.625, 668.625);

    this.shape_3 = new cjs.Shape();
    this.shape_3.graphics
      .f('#E911A0')
      .s()
      .p(
        'AiCCDQg3g2AAhNQAAhMA3g2QA2g3BMAAQBNAAA2A3QA3A2AABMQAABNg3A2Qg2A3hNAAQhMAAg2g3g'
      );
    this.shape_3.setTransform(418.625, 418.625);

    this.shape_4 = new cjs.Shape();
    this.shape_4.graphics
      .f('#E911A0')
      .s()
      .p(
        'AiCCEQg3g3AAhNQAAhMA3g3QA2g2BMAAQBNAAA2A2QA3A3AABMQAABNg3A3Qg2A2hNAAQhMAAg2g2g'
      );
    this.shape_4.setTransform(768.625, 68.625);

    this.shape_5 = new cjs.Shape();
    this.shape_5.graphics
      .f('#F6F6F6')
      .s()
      .p(
        'AiCCEQg3g3AAhNQAAhMA3g3QA2g2BMAAQBNAAA2A2QA3A3AABMQAABNg3A3Qg2A2hNAAQhMAAg2g2g'
      );
    this.shape_5.setTransform(1218.6, 218.625);

    this.timeline.addTween(
      cjs.Tween.get({})
        .to({
          state: [
            { t: this.shape_5 },
            { t: this.shape_4 },
            { t: this.shape_3 },
            { t: this.shape_2 },
            { t: this.shape_1 },
            { t: this.shape },
          ],
        })
        .wait(1)
    );

    this._renderFirstFrame();
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(0, 0, 1237.2, 687.2);

  (lib._2svg = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Layer_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .f('#F6F6F6')
      .s()
      .p(
        'AiDCEQg2g3AAhNQAAhMA2g3QA3g2BMAAQBNAAA2A2QA3A3AABMQAABNg3A3Qg2A2hNAAQhMAAg3g2g'
      );
    this.shape.setTransform(568.55, 68.625);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics
      .f('#E911A0')
      .s()
      .p(
        'AiDCDQg2g2AAhNQAAhMA2g2QA3g3BMAAQBNAAA2A3QA3A2AABMQAABNg3A2Qg2A3hNAAQhMAAg3g3g'
      );
    this.shape_1.setTransform(1018.55, 618.625);

    this.shape_2 = new cjs.Shape();
    this.shape_2.graphics
      .f('#000000')
      .s()
      .p(
        'AiCCDQg3g2AAhNQAAhMA3g2QA2g3BMAAQBNAAA3A3QA2A2AABMQAABNg2A2Qg3A3hNAAQhMAAg2g3g'
      );
    this.shape_2.setTransform(18.6, 468.625);

    this.shape_3 = new cjs.Shape();
    this.shape_3.graphics
      .f('#E911A0')
      .s()
      .p(
        'AiCCEQg3g3AAhNQAAhMA3g3QA2g2BMAAQBNAAA2A2QA3A3AABMQAABNg3A3Qg2A2hNAAQhMAAg2g2g'
      );
    this.shape_3.setTransform(218.575, 18.625);

    this.shape_4 = new cjs.Shape();
    this.shape_4.graphics
      .f('#000000')
      .s()
      .p(
        'AiCCDQg3g2AAhNQAAhMA3g2QA2g3BMAAQBNAAA2A3QA3A2AABMQAABNg3A2Qg1A3hOAAQhMAAg2g3g'
      );
    this.shape_4.setTransform(1268.55, 368.625);

    this.timeline.addTween(
      cjs.Tween.get({})
        .to({
          state: [
            { t: this.shape_4 },
            { t: this.shape_3 },
            { t: this.shape_2 },
            { t: this.shape_1 },
            { t: this.shape },
          ],
        })
        .wait(1)
    );

    this._renderFirstFrame();
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(0, 0, 1287.2, 637.2);

  (lib._1svg = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Layer_1
    this.shape = new cjs.Shape();
    this.shape.graphics
      .f('#F6F6F6')
      .s()
      .p(
        'AiCCDQg3g2AAhNQAAhMA3g2QA2g3BMAAQBNAAA3A3QA2A2AABMQAABNg2A2Qg3A3hNAAQhMAAg2g3g'
      );
    this.shape.setTransform(1068.55, 418.625);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics
      .f('#E911A0')
      .s()
      .p(
        'AiCCDQg3g2AAhNQAAhMA3g2QA2g3BMAAQBNAAA2A3QA3A2AABMQAABNg3A2Qg2A3hNAAQhMAAg2g3g'
      );
    this.shape_1.setTransform(268.575, 618.625);

    this.shape_2 = new cjs.Shape();
    this.shape_2.graphics
      .f('#000000')
      .s()
      .p(
        'AiCCEQg3g3AAhNQAAhMA3g3QA2g2BMAAQBNAAA3A2QA2A3AABMQAABNg2A3Qg3A2hNAAQhMAAg2g2g'
      );
    this.shape_2.setTransform(18.6, 18.625);

    this.shape_3 = new cjs.Shape();
    this.shape_3.graphics
      .f('#E911A0')
      .s()
      .p(
        'AiCCEQg3g3AAhNQAAhMA3g3QA2g2BMAAQBNAAA2A2QA3A3AABMQAABNg3A3Qg2A2hNAAQhMAAg2g2g'
      );
    this.shape_3.setTransform(1168.55, 18.625);

    this.shape_4 = new cjs.Shape();
    this.shape_4.graphics
      .f('#000000')
      .s()
      .p(
        'AiDCEQg2g3AAhNQAAhMA2g3QA3g2BMAAQBNAAA2A2QA3A3AABMQAABNg3A3Qg2A2hNAAQhMAAg3g2g'
      );
    this.shape_4.setTransform(918.55, 268.625);

    this.timeline.addTween(
      cjs.Tween.get({})
        .to({
          state: [
            { t: this.shape_4 },
            { t: this.shape_3 },
            { t: this.shape_2 },
            { t: this.shape_1 },
            { t: this.shape },
          ],
        })
        .wait(1)
    );

    this._renderFirstFrame();
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(0, 0, 1187.2, 637.2);

  (lib._7 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_1
    this.instance = new lib._7svg('synched', 0);
    this.instance.setTransform(818.6, 243.6, 1, 1, 0, 0, 0, 818.6, 243.6);

    this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    this._renderFirstFrame();
  }).prototype = getMCSymbolPrototype(
    lib._7,
    new cjs.Rectangle(0, 0, 1637.2, 487.2),
    null
  );

  (lib._6 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_1
    this.instance = new lib._6svg('synched', 0);
    this.instance.setTransform(518.5, 243.6, 1, 1, 0, 0, 0, 518.5, 243.6);

    this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    this._renderFirstFrame();
  }).prototype = getMCSymbolPrototype(
    lib._6,
    new cjs.Rectangle(0, 0, 1037.2, 487.2),
    null
  );

  (lib._5 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_1
    this.instance = new lib._5svg('synched', 0);
    this.instance.setTransform(418.6, 318.6, 1, 1, 0, 0, 0, 418.6, 318.6);

    this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    this._renderFirstFrame();
  }).prototype = getMCSymbolPrototype(
    lib._5,
    new cjs.Rectangle(0, 0, 837.2, 637.2),
    null
  );

  (lib._4 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_1
    this.instance = new lib._4svg('synched', 0);
    this.instance.setTransform(593.6, 243.6, 1, 1, 0, 0, 0, 593.6, 243.6);

    this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    this._renderFirstFrame();
  }).prototype = getMCSymbolPrototype(
    lib._4,
    new cjs.Rectangle(0, 0, 1187.2, 487.2),
    null
  );

  (lib._3 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_1
    this.instance = new lib._3svg('synched', 0);
    this.instance.setTransform(618.6, 343.6, 1, 1, 0, 0, 0, 618.6, 343.6);

    this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    this._renderFirstFrame();
  }).prototype = getMCSymbolPrototype(
    lib._3,
    new cjs.Rectangle(0, 0, 1237.2, 687.2),
    null
  );

  (lib._2 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_1
    this.instance = new lib._2svg('synched', 0);
    this.instance.setTransform(643.6, 318.6, 1, 1, 0, 0, 0, 643.6, 318.6);

    this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    this._renderFirstFrame();
  }).prototype = getMCSymbolPrototype(
    lib._2,
    new cjs.Rectangle(0, 0, 1287.2, 637.2),
    null
  );

  (lib._1 = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    // Слой_1
    this.instance = new lib._1svg('synched', 0);
    this.instance.setTransform(593.6, 318.6, 1, 1, 0, 0, 0, 593.6, 318.6);

    this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    this._renderFirstFrame();
  }).prototype = getMCSymbolPrototype(
    lib._1,
    new cjs.Rectangle(0, 0, 1187.2, 637.2),
    null
  );

  // stage content:
  (lib.bgdesktop = function (mode, startPosition, loop) {
    this.initialize(mode, startPosition, loop, {});

    this.actionFrames = [0];
    // timeline functions:
    this.frame_0 = function () {
      this.clearAllSoundStreams();
    };

    // actions tween:
    this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(315));

    // Слой_8
    this.instance = new lib._7();
    this.instance.setTransform(981.6, 417.6, 1, 1, 0, 0, 0, 818.6, 243.6);
    this.instance.alpha = 0.0117;
    this.instance._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance)
        .wait(270)
        .to({ _off: false }, 0)
        .to({ alpha: 1 }, 9)
        .wait(25)
        .to({ alpha: 0.0117 }, 10)
        .wait(1)
    );

    // Слой_7
    this.instance_1 = new lib._6();
    this.instance_1.setTransform(781.5, 467.6, 1, 1, 0, 0, 0, 518.5, 243.6);
    this.instance_1.alpha = 0.0117;
    this.instance_1._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_1)
        .wait(225)
        .to({ _off: false }, 0)
        .to({ alpha: 1 }, 9)
        .wait(25)
        .to({ alpha: 0.0117 }, 10)
        .to({ _off: true }, 1)
        .wait(45)
    );

    // Слой_6
    this.instance_2 = new lib._5();
    this.instance_2.setTransform(780.6, 491.6, 1, 1, 0, 0, 0, 418.6, 318.6);
    this.instance_2.alpha = 0.0117;
    this.instance_2._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_2)
        .wait(180)
        .to({ _off: false }, 0)
        .to({ alpha: 1 }, 9)
        .wait(25)
        .to({ alpha: 0.0117 }, 10)
        .to({ _off: true }, 1)
        .wait(90)
    );

    // Слой_5
    this.instance_3 = new lib._4();
    this.instance_3.setTransform(955.6, 416.6, 1, 1, 0, 0, 0, 593.6, 243.6);
    this.instance_3.alpha = 0.0117;
    this.instance_3._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_3)
        .wait(135)
        .to({ _off: false }, 0)
        .to({ alpha: 1 }, 9)
        .wait(25)
        .to({ alpha: 0.0117 }, 10)
        .to({ _off: true }, 1)
        .wait(135)
    );

    // Слой_4
    this.instance_4 = new lib._3();
    this.instance_4.setTransform(830.6, 517.6, 1, 1, 0, 0, 0, 618.6, 343.6);
    this.instance_4.alpha = 0.0117;
    this.instance_4._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_4)
        .wait(90)
        .to({ _off: false }, 0)
        .to({ alpha: 1 }, 9)
        .wait(25)
        .to({ alpha: 0.0117 }, 10)
        .to({ _off: true }, 1)
        .wait(180)
    );

    // Слой_3
    this.instance_5 = new lib._2();
    this.instance_5.setTransform(1105.6, 541.6, 1, 1, 0, 0, 0, 643.6, 318.6);
    this.instance_5.alpha = 0.0117;
    this.instance_5._off = true;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_5)
        .wait(45)
        .to({ _off: false }, 0)
        .to({ alpha: 1 }, 9)
        .wait(25)
        .to({ alpha: 0.0117 }, 10)
        .to({ _off: true }, 1)
        .wait(225)
    );

    // Слой_2
    this.instance_6 = new lib._1();
    this.instance_6.setTransform(955.6, 541.6, 1, 1, 0, 0, 0, 593.6, 318.6);
    this.instance_6.alpha = 0.0117;

    this.timeline.addTween(
      cjs.Tween.get(this.instance_6)
        .to({ alpha: 1 }, 9)
        .wait(25)
        .to({ alpha: 0.0117 }, 10)
        .to({ _off: true }, 1)
        .wait(270)
    );

    // Слой_1
    this.instance_7 = new lib.backgroundsvg('synched', 0);
    this.instance_7.setTransform(960.95, 539.85, 1, 1, 0, 0, 0, 2878.6, 581.8);

    this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(315));

    this._renderFirstFrame();
  }).prototype = p = new lib.AnMovieClip();
  p.nominalBounds = new cjs.Rectangle(960, 539.6, 961.9000000000001, 540.4);
  // library properties:
  lib.properties = {
    id: '9441FA25C65B1B4387049F2F48B9C763',
    width: 1920,
    height: 820,
    fps: 24,
    color: '#FFFFFF',
    opacity: 1.0,
    manifest: [],
    preloads: [],
  };

  // bootstrap callback support:

  (lib.Stage = function (canvas) {
    createjs.Stage.call(this, canvas);
  }).prototype = p = new createjs.Stage();

  p.setAutoPlay = function (autoPlay) {
    this.tickEnabled = autoPlay;
  };
  p.play = function () {
    this.tickEnabled = true;
    this.getChildAt(0).gotoAndPlay(this.getTimelinePosition());
  };
  p.stop = function (ms) {
    if (ms) this.seek(ms);
    this.tickEnabled = false;
  };
  p.seek = function (ms) {
    this.tickEnabled = true;
    this.getChildAt(0).gotoAndStop((lib.properties.fps * ms) / 1000);
  };
  p.getDuration = function () {
    return (this.getChildAt(0).totalFrames / lib.properties.fps) * 1000;
  };

  p.getTimelinePosition = function () {
    return (this.getChildAt(0).currentFrame / lib.properties.fps) * 1000;
  };

  an.bootcompsLoaded = an.bootcompsLoaded || [];
  if (!an.bootstrapListeners) {
    an.bootstrapListeners = [];
  }

  an.bootstrapCallback = function (fnCallback) {
    an.bootstrapListeners.push(fnCallback);
    if (an.bootcompsLoaded.length > 0) {
      for (var i = 0; i < an.bootcompsLoaded.length; ++i) {
        fnCallback(an.bootcompsLoaded[i]);
      }
    }
  };

  an.compositions = an.compositions || {};
  an.compositions['9441FA25C65B1B4387049F2F48B9C763'] = {
    getStage: function () {
      return exportRoot.stage;
    },
    getLibrary: function () {
      return lib;
    },
    getSpriteSheet: function () {
      return ss;
    },
    getImages: function () {
      return img;
    },
  };

  an.compositionLoaded = function (id) {
    an.bootcompsLoaded.push(id);
    for (var j = 0; j < an.bootstrapListeners.length; j++) {
      an.bootstrapListeners[j](id);
    }
  };

  an.getComposition = function (id) {
    return an.compositions[id];
  };

  an.makeResponsive = function (
    isResp,
    respDim,
    isScale,
    scaleType,
    domContainers
  ) {
    var lastW,
      lastH,
      lastS = 1;
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    function resizeCanvas() {
      var w = lib.properties.width,
        h = lib.properties.height;
      var iw = window.innerWidth,
        ih = window.innerHeight;
      var pRatio = window.devicePixelRatio || 1,
        xRatio = iw / w,
        yRatio = ih / h,
        sRatio = 1;
      if (isResp) {
        if (
          (respDim == 'width' && lastW == iw) ||
          (respDim == 'height' && lastH == ih)
        ) {
          sRatio = lastS;
        } else if (!isScale) {
          if (iw < w || ih < h) sRatio = Math.min(xRatio, yRatio);
        } else if (scaleType == 1) {
          sRatio = Math.min(xRatio, yRatio);
        } else if (scaleType == 2) {
          sRatio = Math.max(xRatio, yRatio);
        }
      }
      domContainers[0].width = w * pRatio * sRatio;
      domContainers[0].height = h * pRatio * sRatio;
      domContainers.forEach(function (container) {
        container.style.width = w * sRatio + 'px';
        container.style.height = h * sRatio + 'px';
      });
      stage.scaleX = pRatio * sRatio;
      stage.scaleY = pRatio * sRatio;
      lastW = iw;
      lastH = ih;
      lastS = sRatio;
      stage.tickOnUpdate = false;
      stage.update();
      stage.tickOnUpdate = true;
    }
  };
  an.handleSoundStreamOnTick = function (event) {
    if (!event.paused) {
      var stageChild = stage.getChildAt(0);
      if (!stageChild.paused) {
        stageChild.syncStreamSounds();
      }
    }
  };
})((createjs = createjs || {}), (AdobeAn = AdobeAn || {}));
var createjs, AdobeAn;
