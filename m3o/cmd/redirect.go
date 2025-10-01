/*
Copyright © 2025 Marco Souza <marco@tremtec.com>
*/
package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

var BASE_URL = "https://marco.podcodar.org/r/"

// redirectCmd represents the redirect command
var redirectCmd = &cobra.Command{
	Use:     "redirect service/path",
	Aliases: []string{"r"},
	Args:    cobra.ExactArgs(1),
	Short:   "Create a redirect URL for my website redirects api",
	Long: `Create a redirect URL for my website redirects api.

Example:
  m3o redirect linkedin -> my linkedin profile
  m3o r gh -> my github profile
  m3o r gh/resume -> my github resume
  m3o r gh/$(basename $PWD) -> this project
`,
	Run: func(cmd *cobra.Command, args []string) {
		path := args[0]
		fmt.Println(BASE_URL + path)
	},
}

func init() {
	rootCmd.AddCommand(redirectCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// redirectCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// redirectCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
