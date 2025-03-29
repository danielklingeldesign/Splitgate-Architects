document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("preview");
  const ctx = canvas.getContext("2d");

  // Setze die Canvas-Auflösung auf 1920x1080 (volle Auflösung)
  canvas.width = 1920;
  canvas.height = 1080;

  // Bilder-Pfade
  const imagePaths = {
    // Faction
    "faction-aeros": "/assets/aeros/loadout_aeros_background.png",
    "faction-sabrask": "/assets/sabrask/loadout_sabrask_background.png",
    "faction-meridian": "/assets/meridian/loadout_meridian_background.png",
    // Primary
    "aeros-cadence": "/assets/aeros/loadout_aeros_primary_cadence.png",
    "aeros-tempo": "/assets/aeros/loadout_aeros_primary_tempo.png",
    "aeros-blitz": "/assets/aeros/loadout_aeros_primary_blitz.png",
    "aeros-pulse": "/assets/aeros/loadout_aeros_primary_pulse.png",
    "aeros-sprinter": "/assets/aeros/loadout_aeros_primary_sprinter.png",

    // Secondary
    "aeros-blink": "/assets/aeros/loadout_aeros_secondary_blink.png",
    "aeros-punch": "/assets/aeros/loadout_aeros_secondary_punch.png",
    "aeros-juke": "/assets/aeros/loadout_aeros_secondary_juke.png",

    // Perks I
    "aeros-perks1-fast-hands": "/assets/aeros/loadout_aeros_perks1_fast_hands.png",
    "aeros-perks1-killer-cooldown": "/assets/aeros/loadout_aeros_perks1_killer_cooldown.png",
    "aeros-perks1-quick-draw": "/assets/aeros/loadout_aeros_perks1_quick_draw.png",
    "aeros-perks1-rapid-recharge": "/assets/aeros/loadout_aeros_perks1_rapid_recharge.png",
    "aeros-perks1-speedy-slayer": "/assets/aeros/loadout_aeros_perks1_speedy_slayer.png",

    // Perks II
    "aeros-perks2-super-fit": "/assets/aeros/loadout_aeros_perks2_super_fit.png",
    "aeros-perks2-hustle": "/assets/aeros/loadout_aeros_perks2_hustle.png",
    "aeros-perks2-slide": "/assets/aeros/loadout_aeros_perks2_slide.png",
    "aeros-perks2-gear-upgrade": "/assets/aeros/loadout_aeros_perks2_gear_upgrade.png",
    "aeros-perks2-better-rush": "/assets/aeros/loadout_aeros_perks2_better_rush.png",

    // Equipment
    "aeros-equipment-shock-disc": "/assets/aeros/loadout_aeros_equipment_shock_disc.png",
    "aeros-equipment-stim-shot": "/assets/aeros/loadout_aeros_equipment_stim_shot.png",
    "aeros-equipment-porta-portal": "/assets/aeros/loadout_aeros_equipment_porta_portal.png",
  };

  const loadedImages = {};
  let selectedFaction = null;
  let selectedPrimary = null;
  let selectedSecondary = null;
  let selectedPerks1 = null;
  let selectedPerks2 = null;
  let selectedEquipment = null;

  // Bilder vorladen
  function preloadImages(callback) {
    let loadedCount = 0;
    const keys = Object.keys(imagePaths);

    keys.forEach((layer) => {
      const img = new Image();
      img.src = imagePaths[layer];
      img.onload = () => {
        loadedImages[layer] = img;
        console.log(`Bild geladen: ${layer}`);
        loadedCount++;
        if (loadedCount === keys.length) {
          callback();
        }
      };
      img.onerror = () => {
        console.error(`Fehler beim Laden des Bildes: ${img.src}`);
        loadedCount++;
        if (loadedCount === keys.length) {
          callback();
        }
      };
    });
  }

  // Canvas rendern
  function renderCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Hintergrund basierend auf der gewählten Faction setzen
    if (selectedFaction && loadedImages[selectedFaction]) {
      ctx.drawImage(loadedImages[selectedFaction], 0, 0, canvas.width, canvas.height);
    }

    // Dann die gewählte Primary-Waffe zeichnen
    if (selectedPrimary && loadedImages[selectedPrimary]) {
      ctx.drawImage(loadedImages[selectedPrimary], 0, 0, canvas.width, canvas.height);
    }

    // Dann die gewählte Secondary-Waffe zeichnen
    if (selectedSecondary && loadedImages[selectedSecondary]) {
      ctx.drawImage(loadedImages[selectedSecondary], 0, 0, canvas.width, canvas.height);
    }

    // Dann die gewählten Perks I zeichnen
    if (selectedPerks1 && loadedImages[selectedPerks1]) {
      ctx.drawImage(loadedImages[selectedPerks1], 0, 0, canvas.width, canvas.height);
    }

    // Dann die gewählten Perks II zeichnen
    if (selectedPerks2 && loadedImages[selectedPerks2]) {
      ctx.drawImage(loadedImages[selectedPerks2], 0, 0, canvas.width, canvas.height);
    }

    // Dann das gewählte Equipment zeichnen
    if (selectedEquipment && loadedImages[selectedEquipment]) {
      ctx.drawImage(loadedImages[selectedEquipment], 0, 0, canvas.width, canvas.height);
    }
  }

  // Eventlistener für Dropdowns einrichten
  function setupDropdown(selectSelector, selectionType) {
    const selectElement = document.querySelector(selectSelector);
    if (!selectElement) {
      console.error(`Dropdown nicht gefunden: ${selectSelector}`);
      return;
    }

    // Initialwert aus dem Dropdown setzen
    if (selectionType === "faction") {
      selectedFaction = selectElement.value;
    } else if (selectionType === "primary") {
      selectedPrimary = selectElement.value;
    } else if (selectionType === "secondary") {
      selectedSecondary = selectElement.value;
    } else if (selectionType === "perks1") {
      selectedPerks1 = selectElement.value;
    } else if (selectionType === "perks2") {
      // Setup für Perks II
      selectedPerks2 = selectElement.value;
    } else if (selectionType === "equipment") {
      selectedEquipment = selectElement.value;
    }

    // Änderungen überwachen
    selectElement.addEventListener("change", (event) => {
      const selectedValue = event.target.value;

      if (selectionType === "faction") {
        selectedFaction = selectedValue;
      } else if (selectionType === "primary") {
        selectedPrimary = selectedValue;
      } else if (selectionType === "secondary") {
        selectedSecondary = selectedValue;
      } else if (selectionType === "perks1") {
        selectedPerks1 = selectedValue;
      } else if (selectionType === "perks2") {
        // Update für Perks II
        selectedPerks2 = selectedValue;
      } else if (selectionType === "equipment") {
        selectedEquipment = selectedValue;
      }

      renderCanvas(); // Canvas bei Änderung aktualisieren
    });
  }

  // Export-Funktion
  document.getElementById("exportBtn").addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "loadout-preview.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });

  // Initialisierung
  function initialize() {
    // Dropdowns einrichten
    setupDropdown("#faction-select", "faction");
    setupDropdown("#primary-select", "primary");
    setupDropdown("#secondary-select", "secondary");
    setupDropdown("#perks1-select", "perks1");
    setupDropdown("#perks2-select", "perks2");
    setupDropdown("#equipment-select", "equipment");

    // Bilder laden und danach rendern
    preloadImages(() => {
      renderCanvas(); // Erster Render nach Laden der Bilder
    });
  }

  // Start der Initialisierung
  initialize();
});
