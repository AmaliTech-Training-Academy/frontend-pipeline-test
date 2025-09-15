import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { CustomTooltip } from "../cost-trend-custom-tool-tip"

describe("CustomTooltip", () => {
  it("renders nothing when inactive", () => {
    const { container } = render(
      <CustomTooltip active={false} payload={[]} label="Test Label" />
    )
    expect(container.firstChild).toBeNull()
  })

  it("renders nothing when payload is empty", () => {
    const { container } = render(
      <CustomTooltip active={true} payload={[]} label="Test Label" />
    )
    expect(container.firstChild).toBeNull()
  })

  it("renders tooltip with label and cost when active and payload provided", () => {
    render(
      <CustomTooltip
        active={true}
        payload={[
          { value: 1234, name: "cost", color: "#000000" }
        ]}
        label="Aug 2025"
      />
    )

    // Check label
    expect(screen.getByText("Aug 2025")).toBeInTheDocument()

    // Check cost text
    expect(screen.getByText(/Cost:/)).toBeInTheDocument()
    expect(screen.getByText(/\$1,234/)).toBeInTheDocument()
  })

  it("formats different values correctly", () => {
    render(
      <CustomTooltip
        active={true}
        payload={[
          { value: 9999999, name: "cost", color: "#ff0000" }
        ]}
        label="Sep 2025"
      />
    )
 
    expect(screen.getByText(/\$9,999,999/)).toBeInTheDocument()
  })
})
