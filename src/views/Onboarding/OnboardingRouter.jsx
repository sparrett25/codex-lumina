import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import WelcomeIntro from "./WelcomeIntro";
import JourneyOverview from "./JourneyOverview";
import Assessment from "./Assessment";
import LensSelectionStep from "./LensSelectionStep";
import VoiceCaptureRitual from "./VoiceCaptureRitual";
import ProfileReveal from "./ProfileReveal";

import OnboardingLayout from "./OnboardingLayout";

const OnboardingRouter = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="welcome"
        element={
          <OnboardingLayout step="welcome">
            <WelcomeIntro />
          </OnboardingLayout>
        }
      />
      <Route
        path="overview"
        element={
          <OnboardingLayout step="overview">
            <JourneyOverview />
          </OnboardingLayout>
        }
      />
      <Route
        path="assessment"
        element={
          <OnboardingLayout step="assessment">
            <Assessment />
          </OnboardingLayout>
        }
      />
      <Route
        path="lens-selection"
        element={
          <OnboardingLayout step="lens-selection">
            <LensSelectionStep />
          </OnboardingLayout>
        }
      />
      <Route
        path="voice-capture"
        element={
          <OnboardingLayout step="voice-capture">
            <VoiceCaptureRitual
              onComplete={(blob, url) => {
                console.log("Voice upload complete:", { blob, url });
                navigate("/onboarding/reveal");
              }}
            />
          </OnboardingLayout>
        }
      />
      <Route
        path="reveal"
        element={
          <OnboardingLayout step="reveal">
            <ProfileReveal />
          </OnboardingLayout>
        }
      />
      <Route path="*" element={<Navigate to="welcome" replace />} />
    </Routes>
  );
};

export default OnboardingRouter;
