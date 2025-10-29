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
