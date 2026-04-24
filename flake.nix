{
  description = "lumen.css — development shell";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; config.allowUnfree = false; };
      in
      {
        devShells.default = pkgs.mkShell {
          name = "lumen-css";

          packages = with pkgs; [
            nodejs_22
            # Playwright needs a NixOS-patched Chromium to run headlessly on NixOS.
            # PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH is read by playwright.config.js
            # so tests can be launched without downloading a separate browser binary.
            chromium
          ];

          shellHook = ''
            # Install local npm dependencies on shell entry when node_modules
            # is absent or out of date relative to package.json.
            if [ ! -d node_modules ] || [ package.json -nt node_modules ]; then
              echo "lumen.css: running npm install..."
              npm install --prefer-offline --silent
            fi

            # Point Playwright at the NixOS-patched system Chromium so that the
            # downloaded chrome-headless-shell binary (which does not work on NixOS)
            # is never used.
            export PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH="${pkgs.chromium}/bin/chromium"
            # Skip the automatic browser download entirely; we supply our own.
            export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
          '';
        };
      }
    );
}
