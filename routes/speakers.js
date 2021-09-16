const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;

  router.get('/', async (req, res) => {
    const speakers = await speakersService.getList();
    res.render('layout', { pageTitle: 'Speakers', template: 'speakers', speakers });
  });

  router.get('/:shortname', async (req, res) => {
    const {
      params: { shortname },
    } = req;

    const speaker = await speakersService.getSpeaker(shortname);
    const artworks = await speakersService.getArtworkForSpeaker(shortname);

    res.render('layout', {
      pageTitle: `${shortname} Details`,
      template: 'speaker-details',
      speaker,
      artworks,
    });
  });

  return router;
};
