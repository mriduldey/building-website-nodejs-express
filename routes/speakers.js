const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;

  router.get('/', async (req, res, next) => {
    try {
      const speakers = await speakersService.getList();
      const artworks = await speakersService.getAllArtwork();
      return res.render('layout', {
        pageTitle: 'Speakers',
        template: 'speakers',
        speakers,
        artworks,
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:shortname', async (req, res, next) => {
    try {
      const {
        params: { shortname },
      } = req;

      const speaker = await speakersService.getSpeaker(shortname);
      const artworks = await speakersService.getArtworkForSpeaker(shortname);

      return res.render('layout', {
        pageTitle: `${shortname} Details`,
        template: 'speaker-details',
        speaker,
        artworks,
      });
    } catch (err) {
      next(err);
    }
  });

  return router;
};
