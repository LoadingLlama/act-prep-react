#!/usr/bin/env python3
"""
Math Diagram Generator
Generates all geometric diagrams for ACT Math lessons using Matplotlib
Clean, labeled, centered, ACT-style diagrams
"""

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import Arc, FancyBboxPatch, Polygon, Wedge, Circle
from matplotlib.patches import FancyArrowPatch
import os

# Create output directories
OUTPUT_DIR = '../public/images/math/geometry'
ALGEBRA_DIR = '../public/images/math/algebra'
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(ALGEBRA_DIR, exist_ok=True)

# ACT-style colors
ACT_BLUE = '#08245b'
ACT_GRAY = '#6b7280'
ACT_LIGHT_GRAY = '#e5e7eb'
ACT_ACCENT = '#3b82f6'

def setup_clean_axes(fig_size=(8, 6)):
    """
    Create a clean matplotlib figure with ACT styling
    """
    fig, ax = plt.subplots(figsize=fig_size, dpi=150)
    ax.set_aspect('equal')
    ax.axis('off')
    ax.set_xlim(-1, 11)
    ax.set_ylim(-1, 11)
    return fig, ax

def add_angle_mark(ax, vertex, point1, point2, radius=0.5, label='', label_offset=0.3):
    """
    Add an angle arc marker between two rays
    vertex: (x, y) - the angle vertex
    point1, point2: (x, y) - points defining the two rays
    """
    vx, vy = vertex
    p1x, p1y = point1
    p2x, p2y = point2

    # Calculate angles
    angle1 = np.degrees(np.arctan2(p1y - vy, p1x - vx))
    angle2 = np.degrees(np.arctan2(p2y - vy, p2x - vx))

    # Ensure angle2 > angle1
    if angle2 < angle1:
        angle1, angle2 = angle2, angle1

    # Draw arc
    arc = Arc(vertex, 2*radius, 2*radius, angle=0,
              theta1=angle1, theta2=angle2,
              color=ACT_ACCENT, linewidth=2)
    ax.add_patch(arc)

    # Add label if provided
    if label:
        mid_angle = np.radians((angle1 + angle2) / 2)
        label_x = vx + (radius + label_offset) * np.cos(mid_angle)
        label_y = vy + (radius + label_offset) * np.sin(mid_angle)
        ax.text(label_x, label_y, label, fontsize=12, color=ACT_BLUE,
                ha='center', va='center', fontweight='bold')

def add_length_label(ax, point1, point2, label, offset=0.3, above=True):
    """
    Add a length label to a line segment
    """
    x1, y1 = point1
    x2, y2 = point2

    # Midpoint
    mx = (x1 + x2) / 2
    my = (y1 + y2) / 2

    # Perpendicular offset
    dx = x2 - x1
    dy = y2 - y1
    length = np.sqrt(dx**2 + dy**2)

    if length > 0:
        # Unit perpendicular vector
        px = -dy / length
        py = dx / length

        # Offset direction
        if not above:
            px, py = -px, -py

        label_x = mx + offset * px
        label_y = my + offset * py

        ax.text(label_x, label_y, label, fontsize=11, color=ACT_BLUE,
                ha='center', va='center', fontweight='600',
                bbox=dict(boxstyle='round,pad=0.3', facecolor='white',
                         edgecolor='none', alpha=0.8))

def draw_line_with_arrow(ax, point1, point2, extend_start=True, extend_end=True):
    """
    Draw a line with arrows extending beyond the points
    """
    x1, y1 = point1
    x2, y2 = point2

    # Calculate direction
    dx = x2 - x1
    dy = y2 - y1
    length = np.sqrt(dx**2 + dy**2)

    if length > 0:
        ux = dx / length
        uy = dy / length

        # Extend line
        extend_length = 1.5
        if extend_start:
            start_x = x1 - extend_length * ux
            start_y = y1 - extend_length * uy
        else:
            start_x, start_y = x1, y1

        if extend_end:
            end_x = x2 + extend_length * ux
            end_y = y2 + extend_length * uy
        else:
            end_x, end_y = x2, y2

        ax.plot([start_x, end_x], [start_y, end_y],
                color=ACT_GRAY, linewidth=2)

        # Add arrows if extending
        if extend_end:
            ax.plot(end_x, end_y, marker='>', markersize=8,
                   color=ACT_GRAY, markerfacecolor=ACT_GRAY)
        if extend_start:
            ax.plot(start_x, start_y, marker='<', markersize=8,
                   color=ACT_GRAY, markerfacecolor=ACT_GRAY)

# ============================================================================
# DIAGRAM 1: Vertical and Adjacent Angles
# ============================================================================
def generate_vertical_angles():
    """
    Generate diagram showing vertical angles
    """
    fig, ax = setup_clean_axes(fig_size=(8, 6))

    # Center point
    center = (5, 5)

    # Draw two intersecting lines
    # Line 1: from bottom-left to top-right
    ax.plot([2, 8], [2, 8], color=ACT_BLUE, linewidth=2.5)
    # Line 2: from top-left to bottom-right
    ax.plot([2, 8], [8, 2], color=ACT_BLUE, linewidth=2.5)

    # Mark center point
    ax.plot(center[0], center[1], 'o', color=ACT_ACCENT, markersize=8)

    # Add angle markers for vertical angles
    add_angle_mark(ax, center, (2, 2), (2, 8), radius=0.8, label='a°')
    add_angle_mark(ax, center, (8, 2), (8, 8), radius=0.8, label='a°')
    add_angle_mark(ax, center, (2, 8), (8, 2), radius=1.2, label='b°')
    add_angle_mark(ax, center, (8, 8), (2, 2), radius=1.2, label='b°')

    # Add title
    ax.text(5, 9.5, 'Vertical Angles Are Equal', fontsize=14,
            fontweight='bold', color=ACT_BLUE, ha='center')
    ax.text(5, 0.5, 'a° = a°  and  b° = b°', fontsize=12,
            color=ACT_GRAY, ha='center')

    plt.tight_layout()
    plt.savefig(f'{OUTPUT_DIR}/vertical-angles.svg', format='svg', bbox_inches='tight')
    plt.close()
    print('✓ Generated: vertical-angles.svg')

# ============================================================================
# DIAGRAM 2: Parallel Lines with Transversal
# ============================================================================
def generate_parallel_lines_transversal():
    """
    Generate diagram showing parallel lines cut by a transversal
    """
    fig, ax = setup_clean_axes(fig_size=(10, 8))

    # Draw two parallel lines
    y1, y2 = 3, 7
    ax.plot([1, 9], [y1, y1], color=ACT_BLUE, linewidth=2.5)
    ax.plot([1, 9], [y2, y2], color=ACT_BLUE, linewidth=2.5)

    # Draw transversal (diagonal line cutting through)
    ax.plot([2, 8], [1.5, 8.5], color=ACT_ACCENT, linewidth=2.5)

    # Intersection points
    # Line 1 intersection at approximately (4, 3)
    p1 = (4.29, y1)
    # Line 2 intersection at approximately (6, 7)
    p2 = (5.71, y2)

    # Mark intersection points
    ax.plot(p1[0], p1[1], 'o', color='black', markersize=6)
    ax.plot(p2[0], p2[1], 'o', color='black', markersize=6)

    # Label angles
    # At first intersection
    ax.text(p1[0] - 0.8, p1[1] + 0.5, '1', fontsize=11, color=ACT_BLUE,
            fontweight='bold', ha='center', va='center',
            bbox=dict(boxstyle='circle,pad=0.15', facecolor='white', edgecolor=ACT_ACCENT))
    ax.text(p1[0] + 0.8, p1[1] + 0.5, '2', fontsize=11, color=ACT_BLUE,
            fontweight='bold', ha='center', va='center',
            bbox=dict(boxstyle='circle,pad=0.15', facecolor='white', edgecolor=ACT_ACCENT))
    ax.text(p1[0] + 0.8, p1[1] - 0.5, '3', fontsize=11, color=ACT_BLUE,
            fontweight='bold', ha='center', va='center',
            bbox=dict(boxstyle='circle,pad=0.15', facecolor='white', edgecolor=ACT_ACCENT))
    ax.text(p1[0] - 0.8, p1[1] - 0.5, '4', fontsize=11, color=ACT_BLUE,
            fontweight='bold', ha='center', va='center',
            bbox=dict(boxstyle='circle,pad=0.15', facecolor='white', edgecolor=ACT_ACCENT))

    # At second intersection
    ax.text(p2[0] - 0.8, p2[1] + 0.5, '5', fontsize=11, color=ACT_BLUE,
            fontweight='bold', ha='center', va='center',
            bbox=dict(boxstyle='circle,pad=0.15', facecolor='white', edgecolor=ACT_ACCENT))
    ax.text(p2[0] + 0.8, p2[1] + 0.5, '6', fontsize=11, color=ACT_BLUE,
            fontweight='bold', ha='center', va='center',
            bbox=dict(boxstyle='circle,pad=0.15', facecolor='white', edgecolor=ACT_ACCENT))
    ax.text(p2[0] + 0.8, p2[1] - 0.5, '7', fontsize=11, color=ACT_BLUE,
            fontweight='bold', ha='center', va='center',
            bbox=dict(boxstyle='circle,pad=0.15', facecolor='white', edgecolor=ACT_ACCENT))
    ax.text(p2[0] - 0.8, p2[1] - 0.5, '8', fontsize=11, color=ACT_BLUE,
            fontweight='bold', ha='center', va='center',
            bbox=dict(boxstyle='circle,pad=0.15', facecolor='white', edgecolor=ACT_ACCENT))

    # Add parallel marks
    ax.text(0.5, y1, '→', fontsize=14, color=ACT_GRAY)
    ax.text(0.5, y2, '→', fontsize=14, color=ACT_GRAY)

    # Add title and legend
    ax.text(5, 9.5, 'Parallel Lines Cut by Transversal', fontsize=14,
            fontweight='bold', color=ACT_BLUE, ha='center')
    ax.text(5, 0.3, 'Corresponding: ∠1=∠5, ∠2=∠6  |  Alternate Interior: ∠3=∠6, ∠4=∠5',
            fontsize=10, color=ACT_GRAY, ha='center')

    plt.tight_layout()
    plt.savefig(f'{OUTPUT_DIR}/parallel-lines-transversal.svg', format='svg', bbox_inches='tight')
    plt.close()
    print('✓ Generated: parallel-lines-transversal.svg')

# ============================================================================
# DIAGRAM 3: Right Triangle with Pythagorean Theorem
# ============================================================================
def generate_right_triangle():
    """
    Generate right triangle diagram with Pythagorean theorem
    """
    fig, ax = setup_clean_axes(fig_size=(8, 6))

    # Triangle vertices
    A = (2, 2)
    B = (7, 2)
    C = (7, 6)

    # Draw triangle
    triangle = Polygon([A, B, C], fill=False, edgecolor=ACT_BLUE, linewidth=2.5)
    ax.add_patch(triangle)

    # Mark right angle
    square_size = 0.4
    square = patches.Rectangle((B[0] - square_size, B[1]), square_size, square_size,
                               fill=False, edgecolor=ACT_ACCENT, linewidth=2)
    ax.add_patch(square)

    # Add length labels
    add_length_label(ax, A, B, 'b', offset=0.4, above=False)
    add_length_label(ax, B, C, 'a', offset=0.4, above=True)
    add_length_label(ax, A, C, 'c', offset=0.4, above=True)

    # Mark vertices
    ax.text(A[0] - 0.4, A[1], 'A', fontsize=12, color=ACT_BLUE, fontweight='bold')
    ax.text(B[0] + 0.4, B[1], 'B', fontsize=12, color=ACT_BLUE, fontweight='bold')
    ax.text(C[0] + 0.4, C[1] + 0.3, 'C', fontsize=12, color=ACT_BLUE, fontweight='bold')

    # Add title and formula
    ax.text(5, 9, 'Right Triangle - Pythagorean Theorem', fontsize=14,
            fontweight='bold', color=ACT_BLUE, ha='center')
    ax.text(5, 0.8, 'a² + b² = c²', fontsize=16, fontweight='bold',
            color=ACT_ACCENT, ha='center',
            bbox=dict(boxstyle='round,pad=0.5', facecolor='#fffbeb', edgecolor=ACT_ACCENT, linewidth=2))

    plt.tight_layout()
    plt.savefig(f'{OUTPUT_DIR}/right-triangle.svg', format='svg', bbox_inches='tight')
    plt.close()
    print('✓ Generated: right-triangle.svg')

# ============================================================================
# DIAGRAM 4: 45-45-90 Special Right Triangle
# ============================================================================
def generate_45_45_90_triangle():
    """
    Generate 45-45-90 special right triangle
    """
    fig, ax = setup_clean_axes(fig_size=(8, 6))

    # Isosceles right triangle
    A = (2, 2)
    B = (7, 2)
    C = (7, 7)

    # Draw triangle with fill
    triangle = Polygon([A, B, C], fill=True, facecolor='#f0f9ff',
                      edgecolor=ACT_BLUE, linewidth=2.5, alpha=0.3)
    ax.add_patch(triangle)
    triangle_outline = Polygon([A, B, C], fill=False, edgecolor=ACT_BLUE, linewidth=2.5)
    ax.add_patch(triangle_outline)

    # Mark right angle
    square_size = 0.4
    square = patches.Rectangle((B[0] - square_size, B[1]), square_size, square_size,
                               fill=False, edgecolor=ACT_ACCENT, linewidth=2)
    ax.add_patch(square)

    # Add 45° angle marks
    add_angle_mark(ax, A, B, C, radius=0.6, label='45°')
    add_angle_mark(ax, C, A, B, radius=0.6, label='45°')

    # Add length labels
    add_length_label(ax, A, B, 'x', offset=0.4, above=False)
    add_length_label(ax, B, C, 'x', offset=0.4, above=True)
    add_length_label(ax, A, C, 'x√2', offset=0.5, above=True)

    # Add title
    ax.text(5, 9.5, '45-45-90 Triangle', fontsize=14,
            fontweight='bold', color=ACT_BLUE, ha='center')
    ax.text(5, 0.5, 'Ratio: x : x : x√2', fontsize=12, fontweight='600',
            color=ACT_ACCENT, ha='center',
            bbox=dict(boxstyle='round,pad=0.4', facecolor='#fffbeb',
                     edgecolor=ACT_ACCENT, linewidth=1.5))

    plt.tight_layout()
    plt.savefig(f'{OUTPUT_DIR}/triangle-45-45-90.svg', format='svg', bbox_inches='tight')
    plt.close()
    print('✓ Generated: triangle-45-45-90.svg')

# ============================================================================
# DIAGRAM 5: 30-60-90 Special Right Triangle
# ============================================================================
def generate_30_60_90_triangle():
    """
    Generate 30-60-90 special right triangle
    """
    fig, ax = setup_clean_axes(fig_size=(8, 6))

    # 30-60-90 triangle
    A = (2, 2)
    B = (7, 2)
    # Height = base * tan(60°) ≈ base * 1.732
    C = (2, 2 + 5 * np.tan(np.radians(60)))

    # Draw triangle with fill
    triangle = Polygon([A, B, C], fill=True, facecolor='#f0fdf4',
                      edgecolor=ACT_BLUE, linewidth=2.5, alpha=0.3)
    ax.add_patch(triangle)
    triangle_outline = Polygon([A, B, C], fill=False, edgecolor=ACT_BLUE, linewidth=2.5)
    ax.add_patch(triangle_outline)

    # Mark right angle
    square_size = 0.4
    square = patches.Rectangle((A[0], A[1]), square_size, square_size,
                               fill=False, edgecolor=ACT_ACCENT, linewidth=2)
    ax.add_patch(square)

    # Add angle marks
    add_angle_mark(ax, A, C, B, radius=0.6, label='30°')
    add_angle_mark(ax, B, A, C, radius=0.8, label='60°')

    # Add length labels
    add_length_label(ax, A, B, '2x', offset=0.4, above=False)
    add_length_label(ax, A, C, 'x√3', offset=0.4, above=False)
    add_length_label(ax, B, C, 'x', offset=0.4, above=True)

    # Add title
    ax.text(5, 9.5, '30-60-90 Triangle', fontsize=14,
            fontweight='bold', color=ACT_BLUE, ha='center')
    ax.text(5, 0.5, 'Ratio: x : x√3 : 2x', fontsize=12, fontweight='600',
            color=ACT_ACCENT, ha='center',
            bbox=dict(boxstyle='round,pad=0.4', facecolor='#fffbeb',
                     edgecolor=ACT_ACCENT, linewidth=1.5))

    plt.tight_layout()
    plt.savefig(f'{OUTPUT_DIR}/triangle-30-60-90.svg', format='svg', bbox_inches='tight')
    plt.close()
    print('✓ Generated: triangle-30-60-90.svg')

# ============================================================================
# ALGEBRA DIAGRAMS: Parabolas
# ============================================================================

def setup_coordinate_axes(fig_size=(8, 6), xlim=(-5, 5), ylim=(-2, 10)):
    """
    Create a coordinate plane with clean axes
    """
    fig, ax = plt.subplots(figsize=fig_size, dpi=150)
    ax.set_xlim(xlim)
    ax.set_ylim(ylim)

    # Draw axes
    ax.axhline(y=0, color='black', linewidth=1.5)
    ax.axvline(x=0, color='black', linewidth=1.5)

    # Grid
    ax.grid(True, alpha=0.2, linestyle='--', linewidth=0.5)

    # Ticks
    ax.tick_params(labelsize=10)

    return fig, ax

def generate_standard_parabola():
    """
    Generate y = x^2 parabola
    """
    fig, ax = setup_coordinate_axes(xlim=(-4, 4), ylim=(-1, 8))

    # Generate parabola points
    x = np.linspace(-3, 3, 200)
    y = x**2

    # Plot parabola
    ax.plot(x, y, color=ACT_BLUE, linewidth=3, label='y = x²')

    # Mark vertex
    ax.plot(0, 0, 'o', color='#ef4444', markersize=10, zorder=5)
    ax.text(0.3, 0.3, 'Vertex (0, 0)', fontsize=11, color='#ef4444', fontweight='bold')

    # Mark axis of symmetry
    ax.axvline(x=0, color=ACT_ACCENT, linewidth=2, linestyle='--', alpha=0.7, label='Axis of symmetry: x = 0')

    # Labels
    ax.set_xlabel('x', fontsize=12, fontweight='bold')
    ax.set_ylabel('y', fontsize=12, fontweight='bold')
    ax.set_title('Standard Parabola: y = x²', fontsize=14, fontweight='bold', color=ACT_BLUE, pad=15)
    ax.legend(loc='upper right', fontsize=10)

    plt.tight_layout()
    plt.savefig(f'{ALGEBRA_DIR}/parabola-standard.svg', format='svg', bbox_inches='tight')
    plt.close()
    print('✓ Generated: parabola-standard.svg')

def generate_parabola_vertex_form():
    """
    Generate parabola showing vertex form transformations
    """
    fig, ax = setup_coordinate_axes(xlim=(-5, 5), ylim=(-2, 10))

    # Generate multiple parabolas
    x = np.linspace(-5, 5, 200)

    # y = x^2 (reference)
    y1 = x**2
    ax.plot(x, y1, color=ACT_GRAY, linewidth=2, linestyle='--', alpha=0.5, label='y = x²')

    # y = (x - 2)^2 + 1 (vertex at (2, 1))
    y2 = (x - 2)**2 + 1
    ax.plot(x, y2, color=ACT_BLUE, linewidth=3, label='y = (x - 2)² + 1')

    # Mark vertices
    ax.plot(0, 0, 'o', color=ACT_GRAY, markersize=8, zorder=5)
    ax.text(0.3, 0.3, '(0, 0)', fontsize=10, color=ACT_GRAY)

    ax.plot(2, 1, 'o', color='#ef4444', markersize=10, zorder=5)
    ax.text(2.3, 1.3, 'Vertex (2, 1)', fontsize=11, color='#ef4444', fontweight='bold')

    # Axis of symmetry
    ax.axvline(x=2, color=ACT_ACCENT, linewidth=2, linestyle='--', alpha=0.7)
    ax.text(2, 9.3, 'x = 2', fontsize=10, color=ACT_ACCENT, ha='center', fontweight='bold')

    # Labels
    ax.set_xlabel('x', fontsize=12, fontweight='bold')
    ax.set_ylabel('y', fontsize=12, fontweight='bold')
    ax.set_title('Vertex Form: y = (x - h)² + k', fontsize=14, fontweight='bold', color=ACT_BLUE, pad=15)
    ax.legend(loc='upper left', fontsize=10)

    plt.tight_layout()
    plt.savefig(f'{ALGEBRA_DIR}/parabola-vertex-form.svg', format='svg', bbox_inches='tight')
    plt.close()
    print('✓ Generated: parabola-vertex-form.svg')

def generate_parabola_upward_downward():
    """
    Generate parabolas opening up and down
    """
    fig, ax = setup_coordinate_axes(xlim=(-4, 4), ylim=(-8, 8))

    # Generate parabolas
    x = np.linspace(-4, 4, 200)

    # y = x^2 (opens up)
    y_up = x**2
    ax.plot(x, y_up, color=ACT_BLUE, linewidth=3, label='y = x² (a > 0)')
    ax.plot(0, 0, 'o', color=ACT_BLUE, markersize=10, zorder=5)
    ax.text(0.3, 0.5, 'Min', fontsize=10, color=ACT_BLUE, fontweight='bold')

    # y = -x^2 (opens down)
    y_down = -x**2
    ax.plot(x, y_down, color='#ef4444', linewidth=3, label='y = -x² (a < 0)')
    ax.plot(0, 0, 'o', color='#ef4444', markersize=10, zorder=5)
    ax.text(0.3, -0.5, 'Max', fontsize=10, color='#ef4444', fontweight='bold')

    # Labels
    ax.set_xlabel('x', fontsize=12, fontweight='bold')
    ax.set_ylabel('y', fontsize=12, fontweight='bold')
    ax.set_title('Parabola Direction: a > 0 vs a < 0', fontsize=14, fontweight='bold', color=ACT_BLUE, pad=15)
    ax.legend(loc='upper right', fontsize=10)

    plt.tight_layout()
    plt.savefig(f'{ALGEBRA_DIR}/parabola-direction.svg', format='svg', bbox_inches='tight')
    plt.close()
    print('✓ Generated: parabola-direction.svg')

# ============================================================================
# Main execution
# ============================================================================
if __name__ == '__main__':
    print('Generating ACT Math Diagrams...')
    print('=' * 60)

    print('\n[Geometry Diagrams]')
    generate_vertical_angles()
    generate_parallel_lines_transversal()
    generate_right_triangle()
    generate_45_45_90_triangle()
    generate_30_60_90_triangle()

    print('\n[Algebra Diagrams]')
    generate_standard_parabola()
    generate_parabola_vertex_form()
    generate_parabola_upward_downward()

    print('=' * 60)
    print(f'Geometry diagrams saved to: {OUTPUT_DIR}/')
    print(f'Algebra diagrams saved to: {ALGEBRA_DIR}/')
    print('Total diagrams: 8')
