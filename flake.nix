{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem
      (system:
        let
          pkgs = import nixpkgs {
            inherit system;
          };

          nx = pkgs.writeShellScriptBin "nx" ''
            exec npx nx "$@"
          '';
        in {
          # A package that's installed (using 'nix profile add') into the Copilot work environment.
          # It should make available all the applications and tools that we want Copilot to use.
          #
          # Note: If you change this work environment, don't forget to update copilot-instructions.md to make Copilot aware.
          packages.copilot-work-environment = pkgs.buildEnv {
            name = "copilot-work-environment";
            paths = [
              pkgs.nodejs
              pkgs.biome
            ];
          };

          devShells.default = pkgs.mkShell {
            buildInputs = [
              pkgs.nodejs
              pkgs.nodePackages.pnpm

              pkgs.jq
              pkgs.biome

              nx
            ];
          };
        }
      );
}
