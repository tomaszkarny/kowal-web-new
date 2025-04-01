/**
 * Configuration values for InteractiveSpecialties component
 */
export const config = {
  cycleDuration: 5000, // 5 seconds for auto cycle
  updateInterval: 50, // Update progress every 50ms
  fadeDuration: 250, // Duration for fade transition
  lightboxSettings: {
    animation: { fade: 0 }, // No fade animation to prevent flickering
    carousel: {
      finite: true,
      padding: { left: 16, right: 16 }
    },
    styles: {
      container: { backgroundColor: "rgba(0, 0, 0, .9)" }
    },
    captions: { descriptionTextAlign: "center" }
  }
};
